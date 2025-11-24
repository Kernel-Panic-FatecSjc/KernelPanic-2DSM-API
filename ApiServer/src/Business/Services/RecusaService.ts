import { Repository } from "typeorm";
import { AppDataSource } from "../../DAL/ormconfig";
import { Presenca } from "../../DAL/Models/Presenca";

export class RecusaService {
    private presencaRepository: Repository<Presenca>;

    constructor() {
        this.presencaRepository = AppDataSource.getRepository(Presenca);
    }

    async buscarRecusasComJustificativa(): Promise<any[]> {
        try {
            const recusas = await this.presencaRepository
                .createQueryBuilder("presenca")
                .innerJoinAndSelect("presenca.funcionarioConvidado", "convidado")
                .innerJoinAndSelect("convidado.funcionario", "funcionario")
                .innerJoinAndSelect("convidado.evento", "evento")
                .where("presenca.presente = :presente", { presente: false })
                .andWhere("presenca.razao_recusa IS NOT NULL")
                .andWhere("presenca.razao_recusa != ''")
                .getMany();

            const eventosMap = new Map<number, any>();

            recusas.forEach(recusa => {
                const evento = recusa.funcionarioConvidado.evento;
                const funcionario = recusa.funcionarioConvidado.funcionario;
                
                if (!eventosMap.has(evento.evento_ID)) {
                    eventosMap.set(evento.evento_ID, {
                        id: evento.evento_ID,
                        nome: evento.titulo,
                        funcionarios: []
                    });
                }

                const eventoData = eventosMap.get(evento.evento_ID);
                
                eventoData.funcionarios.push({
                    id: funcionario.funcionario_ID,
                    nome: funcionario.nome,
                    cargo: funcionario.cargo,
                    justificativa: recusa.razao_recusa
                });
            });

            return Array.from(eventosMap.values());

        } catch (error) {
            console.error("Erro ao buscar recusas com justificativa:", error);
            throw new Error("Erro interno ao carregar recusas");
        }
    }

    async buscarRecusasPorEvento(eventoId: number): Promise<any> {
        try {
            const recusas = await this.presencaRepository
                .createQueryBuilder("presenca")
                .innerJoinAndSelect("presenca.funcionarioConvidado", "convidado")
                .innerJoinAndSelect("convidado.funcionario", "funcionario")
                .innerJoinAndSelect("convidado.evento", "evento")
                .where("evento.evento_ID = :eventoId", { eventoId })
                .andWhere("presenca.presente = :presente", { presente: false })
                .andWhere("presenca.razao_recusa IS NOT NULL")
                .andWhere("presenca.razao_recusa != ''")
                .getMany();

            const funcionariosComRecusa = recusas.map(recusa => ({
                id: recusa.funcionarioConvidado.funcionario.funcionario_ID,
                nome: recusa.funcionarioConvidado.funcionario.nome,
                cargo: recusa.funcionarioConvidado.funcionario.cargo,
                justificativa: recusa.razao_recusa
            }));

            return {
                id: eventoId,
                funcionarios: funcionariosComRecusa
            };

        } catch (error) {
            console.error("Erro ao buscar recusas do evento:", error);
            throw new Error("Erro interno ao carregar recusas do evento");
        }
    }
}