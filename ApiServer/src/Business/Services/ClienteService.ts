import { Repository } from "typeorm";
import { AppDataSource } from "../../DAL/ormconfig";
import { Cliente } from "../../DAL/Models/Cliente";
import { ContatoCliente } from "../../DAL/Models/ContatoCliente";
import { Funcionario } from "../../DAL/Models/Funcionario";
import { FunilVendas } from "../../DAL/Models/FunilVendas";

export class ClienteService {
  private clienteRepo: Repository<Cliente>;
  private clienteContatoRepo: Repository<ContatoCliente>;

  constructor() {
    this.clienteRepo = AppDataSource.getRepository(Cliente);
    this.clienteContatoRepo = AppDataSource.getRepository(ContatoCliente);
  }

  // ===== Lista todos os clientes com suas relações =====
  async listarTodos(): Promise<Cliente[]> {
    return this.clienteRepo.find({
      relations: [
        "funcionario",
        "funil",
        "contatos",
        "historico",
        "agendamentos",
        "interacoes",
        "vendas",
      ],
    });
  }

  // ===== Busca cliente por ID com suas relações =====
  async buscarPorID(id: number): Promise<Cliente | null> {
    return this.clienteRepo.findOne({
      where: { cliente_ID: id },
      relations: [
        "funcionario",
        "funil",
        "contatos",
        "historico",
        "agendamentos",
        "interacoes",
        "vendas",
      ],
    });
  }

  // ===== Cria cliente com contato inicial =====
  async criarCliente(data: {
    nome: string;
    endereco: string;
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
    if (!funcionario) throw new Error("Funcionario não encontrado!");

    const funil = await funilRepo.findOneBy({
      funil_ID: data.funil_ID,
    });
    if (!funil) throw new Error("Funil não encontrado!");

    // Cria cliente
    const novoCliente = this.clienteRepo.create({
      nome: data.nome,
      endereco: data.endereco,
      funcionario,
      funil,
    });

    // Salva cliente
    const clienteSalvo = await this.clienteRepo.save(novoCliente);

    // Cria contato associado
    const clienteContato = this.clienteContatoRepo.create({
      tipo_contato: data.tipo_contato,
      valor_contato: data.valor_contato,
      cliente: clienteSalvo,
    });

    await this.clienteContatoRepo.save(clienteContato);

    return clienteSalvo;
  }

  // ===== Atribui um contato a um cliente existente =====
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

  // ===== Atualiza o funil do cliente =====
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
}