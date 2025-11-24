import { Repository } from "typeorm";
import { AppDataSource } from "../../DAL/ormconfig";
import { EventoTreinamento } from "../../DAL/Models/EventoTreinamento";
import { FuncionariosConvidados } from "../../DAL/Models/FuncionariosConvidados";
import { Funcionario } from "../../DAL/Models/Funcionario";

export class EventoService {
    private eventoRepository: Repository<EventoTreinamento>;
    private convidadosRepository: Repository<FuncionariosConvidados>;
    private funcionarioRepository: Repository<Funcionario>;

    constructor() {
        this.eventoRepository = AppDataSource.getRepository(EventoTreinamento);
        this.convidadosRepository = AppDataSource.getRepository(FuncionariosConvidados);
        this.funcionarioRepository = AppDataSource.getRepository(Funcionario);
    }

    async criarEvento(eventoData: any): Promise<EventoTreinamento> {
        try {
            const organizador = await this.funcionarioRepository.findOne({
                where: { funcionario_ID: eventoData.organizador_ID }
            });

            if (!organizador) {
                throw new Error("Organizador não encontrado");
            }

            const evento = this.eventoRepository.create({
                titulo: eventoData.titulo,
                descricao: eventoData.descricao,
                dataHora: eventoData.dataHora,
                duracao_horas: eventoData.duracao_horas || 1,
                evento_link: eventoData.evento_link || "",
                status: "ativo",
                organizador_ID: organizador 
            });

            const eventoSalvo = await this.eventoRepository.save(evento);

            if (eventoData.funcionariosConvidados && eventoData.funcionariosConvidados.length > 0) {
                const convidadosPromises = eventoData.funcionariosConvidados.map(async (funcId: number) => {
                    const funcionario = await this.funcionarioRepository.findOne({
                        where: { funcionario_ID: funcId }
                    });

                    if (!funcionario) {
                        throw new Error(`Funcionário com ID ${funcId} não encontrado`);
                    }

                    return this.convidadosRepository.create({
                        funcionario_ID: funcId,
                        evento_ID: eventoSalvo.evento_ID,
                        funcionario: funcionario,
                        evento: eventoSalvo
                    });
                });

                const convidados = await Promise.all(convidadosPromises);
                await this.convidadosRepository.save(convidados);
            }

            return eventoSalvo;
        } catch (error) {
            console.error("Erro ao criar evento:", error);
            throw new Error("Erro interno ao criar evento");
        }
    }

    async buscarTodosEventos(): Promise<EventoTreinamento[]> {
        try {
            return await this.eventoRepository.find({
                relations: ["organizador_ID"]
            });
        } catch (error) {
            console.error("Erro ao buscar eventos:", error);
            throw new Error("Erro interno ao buscar eventos");
        }
    }

    async atualizarEvento(eventoId: number, eventoData: any): Promise<EventoTreinamento> {
        try {
            const eventoExistente = await this.eventoRepository.findOne({
                where: { evento_ID: eventoId }
            });
            
            if (!eventoExistente) {
                throw new Error("Evento não encontrado");
            }

            const dadosAtualizacao: Partial<EventoTreinamento> = {};
            
            if (eventoData.titulo !== undefined) dadosAtualizacao.titulo = eventoData.titulo;
            if (eventoData.descricao !== undefined) dadosAtualizacao.descricao = eventoData.descricao;
            if (eventoData.dataHora !== undefined) dadosAtualizacao.dataHora = new Date(eventoData.dataHora);
            if (eventoData.duracao_horas !== undefined) dadosAtualizacao.duracao_horas = eventoData.duracao_horas;
            if (eventoData.evento_link !== undefined) dadosAtualizacao.evento_link = eventoData.evento_link;
            if (eventoData.status !== undefined) dadosAtualizacao.status = eventoData.status;

            await this.eventoRepository.update(eventoId, dadosAtualizacao);
            
            const eventoAtualizado = await this.eventoRepository.findOne({
                where: { evento_ID: eventoId },
                relations: ["organizador_ID"]
            });
            
            return eventoAtualizado!;
        } catch (error) {
            console.error("Erro ao atualizar evento:", error);
            throw new Error("Erro interno ao atualizar evento");
        }
    }

    async excluirEvento(eventoId: number): Promise<void> {
        try {
            await this.convidadosRepository.delete({ evento_ID: eventoId });
            
            const result = await this.eventoRepository.delete(eventoId);
            
            if (result.affected === 0) {
                throw new Error("Evento não encontrado");
            }
        } catch (error) {
            console.error("Erro ao excluir evento:", error);
            throw new Error("Erro interno ao excluir evento");
        }
    }

    async buscarEventoPorId(eventoId: number): Promise<EventoTreinamento | null> {
        try {
            return await this.eventoRepository.findOne({
                where: { evento_ID: eventoId },
                relations: ["organizador_ID"]
            });
        } catch (error) {
            console.error("Erro ao buscar evento:", error);
            throw new Error("Erro interno ao buscar evento");
        }
    }

    async buscarEventosDoFuncionario(funcionarioId: number): Promise<any[]> {
        try {
            const convidados = await this.convidadosRepository.find({
                where: { funcionario_ID: funcionarioId },
                relations: ["evento", "evento.organizador_ID"]
            });

            return convidados.map(conv => ({
                evento_ID: conv.evento.evento_ID,
                titulo: conv.evento.titulo,
                descricao: conv.evento.descricao,
                dataHora: conv.evento.dataHora,
                duracao_horas: conv.evento.duracao_horas,
                evento_link: conv.evento.evento_link,
                status: conv.evento.status,
                organizador: {
                    funcionario_ID: conv.evento.organizador_ID.funcionario_ID,
                    nome: conv.evento.organizador_ID.nome
                }
            }));
        } catch (error) {
            console.error("Erro ao buscar eventos do funcionário:", error);
            throw new Error("Erro interno ao carregar eventos");
        }
    }
}