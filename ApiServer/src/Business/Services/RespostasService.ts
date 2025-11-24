import { Repository } from "typeorm";
import { AppDataSource } from "../../DAL/ormconfig";
import { Presenca } from "../../DAL/Models/Presenca";
import { FuncionariosConvidados } from "../../DAL/Models/FuncionariosConvidados";

interface RespostaFuncionario {
    id: number;
    titulo: string;
    funcionario: string;
    cargo: string;
    data: string;
    hora: string;
    local: string;
    justificativa?: string | undefined; 
}

interface RespostasAgrupadas {
    aceitos: RespostaFuncionario[];
    recusados: RespostaFuncionario[];
}

export class RespostaService {
    private presencaRepository: Repository<Presenca>;
    private funcionariosConvidadosRepository: Repository<FuncionariosConvidados>;

    constructor() {
        this.presencaRepository = AppDataSource.getRepository(Presenca);
        this.funcionariosConvidadosRepository = AppDataSource.getRepository(FuncionariosConvidados);
    }

    async buscarTodasRespostas(): Promise<RespostasAgrupadas> {
        try {
            // Buscar todas as presenças com as relações necessárias
            const todasPresencas = await this.presencaRepository
                .createQueryBuilder("presenca")
                .innerJoinAndSelect("presenca.funcionarioConvidado", "convidado")
                .innerJoinAndSelect("convidado.funcionario", "funcionario")
                .innerJoinAndSelect("convidado.evento", "evento")
                .getMany();

            const aceitos: RespostaFuncionario[] = [];
            const recusados: RespostaFuncionario[] = [];

            todasPresencas.forEach(presenca => {
                // Criar objeto resposta sem justificativa primeiro
                const resposta: RespostaFuncionario = {
                    id: presenca.presenca_ID,
                    titulo: presenca.funcionarioConvidado.evento.titulo,
                    funcionario: presenca.funcionarioConvidado.funcionario.nome,
                    cargo: presenca.funcionarioConvidado.funcionario.cargo,
                    data: this.formatarData(presenca.funcionarioConvidado.evento.dataHora),
                    hora: this.formatarHora(presenca.funcionarioConvidado.evento.dataHora),
                    local: "Local do Evento"
                };

                // Adicionar justificativa apenas se existir
                if (presenca.razao_recusa) {
                    resposta.justificativa = presenca.razao_recusa;
                }

                if (presenca.presente) {
                    aceitos.push(resposta);
                } else {
                    recusados.push(resposta);
                }
            });

            return { aceitos, recusados };

        } catch (error) {
            console.error("Erro ao buscar respostas dos funcionários:", error);
            throw new Error("Erro interno ao carregar respostas");
        }
    }

    async buscarRespostasPorEvento(eventoId: number): Promise<RespostasAgrupadas> {
        try {
            // Buscar funcionários convidados para o evento específico
            const convidadosEvento = await this.funcionariosConvidadosRepository
                .createQueryBuilder("convidado")
                .innerJoinAndSelect("convidado.funcionario", "funcionario")
                .innerJoinAndSelect("convidado.evento", "evento")
                .leftJoinAndSelect("convidado.presencas", "presenca")
                .where("convidado.evento_ID = :eventoId", { eventoId })
                .getMany();

            const aceitos: RespostaFuncionario[] = [];
            const recusados: RespostaFuncionario[] = [];

            convidadosEvento.forEach(convidado => {
                // Se não há registro de presença, considerar como não respondido
                if (convidado.presencas && convidado.presencas.length > 0) {
                    const presenca = convidado.presencas[0]; // Pegar a primeira presença
                    
                    if (!presenca) return; // Pular se presenca for undefined
                    
                    const resposta: RespostaFuncionario = {
                        id: presenca.presenca_ID,
                        titulo: convidado.evento.titulo,
                        funcionario: convidado.funcionario.nome,
                        cargo: convidado.funcionario.cargo,
                        data: this.formatarData(convidado.evento.dataHora),
                        hora: this.formatarHora(convidado.evento.dataHora),
                        local: "Local do Evento"
                    };

                    // Adicionar justificativa apenas se existir
                    if (presenca.razao_recusa) {
                        resposta.justificativa = presenca.razao_recusa;
                    }

                    if (presenca.presente) {
                        aceitos.push(resposta);
                    } else {
                        recusados.push(resposta);
                    }
                } else {
                    // Se não há registro de presença, considerar como pendente
                    const resposta: RespostaFuncionario = {
                        id: convidado.funcionario_ID,
                        titulo: convidado.evento.titulo,
                        funcionario: convidado.funcionario.nome,
                        cargo: convidado.funcionario.cargo,
                        data: this.formatarData(convidado.evento.dataHora),
                        hora: this.formatarHora(convidado.evento.dataHora),
                        local: "Local do Evento",
                        justificativa: "Aguardando resposta"
                    };
                    recusados.push(resposta);
                }
            });

            return { aceitos, recusados };

        } catch (error) {
            console.error("Erro ao buscar respostas do evento:", error);
            throw new Error("Erro interno ao carregar respostas do evento");
        }
    }

    // Método alternativo mais simples baseado apenas na tabela Presenca
    async buscarRespostasSimplificado(): Promise<RespostasAgrupadas> {
        try {
            const presencasComRespostas = await this.presencaRepository
                .createQueryBuilder("presenca")
                .innerJoinAndSelect("presenca.funcionarioConvidado", "convidado")
                .innerJoinAndSelect("convidado.funcionario", "funcionario")
                .innerJoinAndSelect("convidado.evento", "evento")
                .getMany();

            const aceitos: RespostaFuncionario[] = [];
            const recusados: RespostaFuncionario[] = [];

            presencasComRespostas.forEach(presenca => {
                const resposta: RespostaFuncionario = {
                    id: presenca.presenca_ID,
                    titulo: presenca.funcionarioConvidado.evento.titulo,
                    funcionario: presenca.funcionarioConvidado.funcionario.nome,
                    cargo: presenca.funcionarioConvidado.funcionario.cargo,
                    data: this.formatarData(presenca.funcionarioConvidado.evento.dataHora),
                    hora: this.formatarHora(presenca.funcionarioConvidado.evento.dataHora),
                    local: "Local do Evento"
                };

                // Adicionar justificativa apenas se existir
                if (presenca.razao_recusa) {
                    resposta.justificativa = presenca.razao_recusa;
                }

                if (presenca.presente) {
                    aceitos.push(resposta);
                } else {
                    recusados.push(resposta);
                }
            });

            return { aceitos, recusados };

        } catch (error) {
            console.error("Erro ao buscar respostas simplificado:", error);
            throw new Error("Erro interno ao carregar respostas");
        }
    }

    private formatarData(data: Date): string {
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = data.getFullYear();
        return `${dia}/${mes}/${ano}`;
    }

    private formatarHora(data: Date): string {
        const horas = String(data.getHours()).padStart(2, '0');
        const minutos = String(data.getMinutes()).padStart(2, '0');
        return `${horas}:${minutos}h`;
    }
}