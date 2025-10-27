
import { Repository } from "typeorm";
import { AppDataSource } from "../../DAL/ormconfig";
import { Cliente } from "../../DAL/Models/Cliente";
import { ContatoCliente } from "../../DAL/Models/ContatoCliente";
import { Funcionario } from "../../DAL/Models/Funcionario";
import { FunilVendas } from "../../DAL/Models/FunilVendas";
import { Vendas } from "../../DAL/Models/Vendas";
import { HistoricoFunil } from "../../DAL/Models/HistoricoFunil";
import { InteracaoCliente } from "../../DAL/Models/InteracaoCliente"; 
export class ClienteService {
    private clienteRepo: Repository<Cliente>;
    private clienteContatoRepo: Repository<ContatoCliente>;

    constructor() {
        this.clienteRepo = AppDataSource.getRepository(Cliente);
        this.clienteContatoRepo = AppDataSource.getRepository(ContatoCliente);
    }

    async listarTodos(): Promise<Cliente[]> {
        return this.clienteRepo.find({
            relations: [
                "funcionario",
                "funil",
                "contatos",
                "historico",
                "interacoes",
                "vendas",
            ],
        });
    }

    async buscarPorID(id: number): Promise<Cliente | null> {
        return this.clienteRepo.findOne({
            where: { cliente_ID: id },
            relations: [
                "funcionario",
                "funil",
                "contatos",
                "historico",
                // "agendamentos", // <-- CORRIGIDO: Linha removida
                "interacoes",
                "vendas",
            ],
        });
    }

async deleteCliente(id: number): Promise<{ message: string }> {
        const cliente = await this.clienteRepo.findOne({
            where: { cliente_ID: id },
            relations: [
                "contatos",
                "vendas",
                "historico",    
                "interacoes",   
                "funil",
                "funcionario",
            ],
        });

        if (!cliente) {
            throw new Error(`Cliente com ID ${id} não encontrado.`);
        }

        if (cliente.contatos && cliente.contatos.length > 0) {
            await this.clienteContatoRepo.delete({
                cliente: { cliente_ID: id },
            });
        }

        if (cliente.vendas && cliente.vendas.length > 0) {
            const vendaRepo = AppDataSource.getRepository(Vendas);
            await vendaRepo.delete({
                cliente: { cliente_ID: id }
            });
        }

        if (cliente.historico && cliente.historico.length > 0) {
            const historicoRepo = AppDataSource.getRepository(HistoricoFunil);
            await historicoRepo.delete({
                cliente: { cliente_ID: id }
            });
        }

        if (cliente.interacoes && cliente.interacoes.length > 0) {
            const interacaoRepo = AppDataSource.getRepository(InteracaoCliente);
            await interacaoRepo.delete({
                cliente: { cliente_ID: id }
            });
        }
        await this.clienteRepo.delete(id);

        return {
            message: `Cliente com ID ${id} e seus dados relacionados foram removidos.`,
        };
    }
    async criarCliente(data: {
        nome: string;
        endereco: string;
        segmento: string;
        funcionario_ID: number;
        funil_ID: number;
        tipo_contato: string;
        valor_contato: string;
    }): Promise<Cliente> {
        const funcionarioRepo = AppDataSource.getRepository(Funcionario);
        const funilRepo = AppDataSource.getRepository(FunilVendas);

        const funcionario = await funcionarioRepo.findOneBy({
            funcionario_ID: data.funcionario_ID,
        });
        if (!funcionario) throw new Error("Funcionário não encontrado!");

        const funil = await funilRepo.findOneBy({
            funil_ID: data.funil_ID,
        });
        if (!funil) throw new Error("Funil não encontrado!");

        const novoCliente = this.clienteRepo.create({
            nome: data.nome,
            endereco: data.endereco,
            funcionario,
            funil,
            segmentoAtuacao: data.segmento || "Não informado",
        });

        const clienteSalvo = await this.clienteRepo.save(novoCliente);

        const clienteContato = this.clienteContatoRepo.create({
            tipo_contato: data.tipo_contato,
            valor_contato: data.valor_contato,
            cliente: clienteSalvo,
        });

        await this.clienteContatoRepo.save(clienteContato);

        return clienteSalvo;
    }

    async atribuirContato(data: {
        tipo_contato: string;
        valor_contato: string;
        cliente_ID: number;
    }): Promise<ContatoCliente> {
        const cliente = await this.clienteRepo.findOneBy({
            cliente_ID: data.cliente_ID,
        });
        if (!cliente) throw new Error("Cliente não encontrado!");

        const clienteContato = this.clienteContatoRepo.create({
            tipo_contato: data.tipo_contato,
            valor_contato: data.valor_contato,
            cliente,
        });

        return await this.clienteContatoRepo.save(clienteContato);
    }

    async editarFunilCliente(
        id_cliente: number,
        novo_funil_id: number
    ): Promise<Cliente> {
        const cliente = await this.clienteRepo.findOne({
            where: { cliente_ID: id_cliente },
        });
        if (!cliente)
            throw new Error(`Cliente com ID ${id_cliente} não encontrado.`);

        const funil = await AppDataSource.getRepository(FunilVendas).findOne({
            where: { funil_ID: novo_funil_id },
        });
        if (!funil)
            throw new Error(`Funil com ID ${novo_funil_id} não encontrado.`);

        cliente.funil = funil;
        return await this.clienteRepo.save(cliente);
    }
    
    async updateCliente(id: number, data: any): Promise<Cliente> {
        const cliente = await this.clienteRepo.findOne({
            where: { cliente_ID: id },
            relations: ["funcionario", "funil"] // Carrega relações para não sobrescrever
        });
        
        if (!cliente) throw new Error("Cliente não encontrado");

        cliente.nome = data.cliente.nome;
        cliente.endereco = data.cliente.endereco;
        cliente.segmentoAtuacao = data.cliente.segmentoAtuacao;

        if (data.funcionario && data.funcionario.funcionario_ID) {
            const funcionarioRepo = AppDataSource.getRepository(Funcionario);
            const funcionario = await funcionarioRepo.findOneBy({
                funcionario_ID: data.funcionario.funcionario_ID,
            });
            if (funcionario) {
                cliente.funcionario = funcionario;
            }
        }

        if (data.cliente.contatos && data.cliente.contatos.length > 0) {
            await this.clienteContatoRepo.delete({ cliente: { cliente_ID: id } });
            
            const novoContato = data.cliente.contatos[0];
            const contato = this.clienteContatoRepo.create({
                tipo_contato: novoContato.tipo_contato,
                valor_contato: novoContato.valor_contato,
                cliente: cliente,
            });
            await this.clienteContatoRepo.save(contato);
        }

        return await this.clienteRepo.save(cliente);
    }
}