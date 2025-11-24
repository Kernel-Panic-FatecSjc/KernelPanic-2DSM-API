import { Repository } from "typeorm";
import { AppDataSource } from "../../DAL/ormconfig";
import { Presenca } from "../../DAL/Models/Presenca";

export class AvaliacaoService {
    private presencaRepository: Repository<Presenca>;

    constructor() {
        this.presencaRepository = AppDataSource.getRepository(Presenca);
    }

    async buscarEventosComAvaliacoes(): Promise<any[]> {
        try {
            const presencasComFeedback = await this.presencaRepository
                .createQueryBuilder("presenca")
                .innerJoinAndSelect("presenca.funcionarioConvidado", "convidado")
                .innerJoinAndSelect("convidado.funcionario", "funcionario")
                .innerJoinAndSelect("convidado.evento", "evento")
                .where("presenca.link_feedback IS NOT NULL")
                .andWhere("presenca.link_feedback != ''")
                .getMany();

            const eventosMap = new Map<number, any>();

            presencasComFeedback.forEach(presenca => {
                const evento = presenca.funcionarioConvidado.evento;
                const funcionario = presenca.funcionarioConvidado.funcionario;
                
                if (!eventosMap.has(evento.evento_ID)) {
                    eventosMap.set(evento.evento_ID, {
                        id: evento.evento_ID,
                        nome: evento.titulo,
                        funcionarios: []
                    });
                }

                const eventoData = eventosMap.get(evento.evento_ID);
                
                const feedbackData = this.extrairDadosFeedback(presenca.link_feedback!);
                
                eventoData.funcionarios.push({
                    id: funcionario.funcionario_ID,
                    nome: funcionario.nome,
                    cargo: funcionario.cargo,
                    avaliacao: feedbackData.nota,
                    avaliacaoEscrita: feedbackData.comentario
                });
            });

            return Array.from(eventosMap.values());

        } catch (error) {
            console.error("Erro ao buscar eventos com avaliações:", error);
            throw new Error("Erro interno ao carregar avaliações");
        }
    }

    private extrairDadosFeedback(linkFeedback: string): { nota: number; comentario: string } {
        try {
            const params = new URLSearchParams(linkFeedback);
            const nota = parseInt(params.get('nota') || '0');
            const comentario = params.get('comentario') || "Sem comentário";
            
            return {
                nota: isNaN(nota) ? 0 : nota,
                comentario: decodeURIComponent(comentario)
            };
        } catch (error) {
            return { nota: 0, comentario: "Erro ao carregar avaliação" };
        }
    }
}