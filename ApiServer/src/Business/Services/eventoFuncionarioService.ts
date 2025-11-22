import { Repository } from "typeorm";
import { AppDataSource } from "../../DAL/ormconfig";
import { EventoTreinamento } from "../../DAL/Models/EventoTreinamento";
import { Presenca } from "../../DAL/Models/Presenca";
import { FuncionariosConvidados } from "../../DAL/Models/FuncionariosConvidados";

export class EventosFuncionarioService {
  private eventoRepo: Repository<EventoTreinamento>;
  private presencaRepo: Repository<Presenca>;
  private convidadosRepo: Repository<FuncionariosConvidados>;

  constructor() {
    this.eventoRepo = AppDataSource.getRepository(EventoTreinamento);
    this.presencaRepo = AppDataSource.getRepository(Presenca);
    this.convidadosRepo = AppDataSource.getRepository(FuncionariosConvidados);
  }

  async buscarEventosDoFuncionario(funcionarioId: number) {
    try {
      console.log(`Buscando eventos para funcionário ID: ${funcionarioId}`);
      
      const convites = await this.convidadosRepo.find({
        where: { funcionario_ID: funcionarioId },
        relations: ["evento", "evento.organizador_ID"]
      });

      console.log(`Encontrados ${convites.length} convites`);

      const presencas = await this.presencaRepo.find({
        where: { funcionario_ID: funcionarioId }
      });

      console.log(`Encontradas ${presencas.length} presenças`);

      const eventosFormatados = convites.map(convite => {
        const evento = convite.evento;
        const presenca = presencas.find(p => p.evento_ID === evento.evento_ID);
        
        let status = "pendente";
        if (presenca) {
          status = presenca.presente ? "aceito" : "recusado";
        }

        const dataEvento = new Date(evento.dataHora);
        const agora = new Date();
        const finalizado = dataEvento < agora;

        return {
          id: evento.evento_ID,
          titulo: evento.titulo,
          data: this.formatarData(evento.dataHora),
          hora: this.formatarHora(evento.dataHora),
          local: evento.evento_link ? "Online" : "Presencial",
          descricao: evento.descricao || "",
          duracao: evento.duracao_horas,
          status: status,
          justificativa: presenca?.razao_recusa || "",
          linkFeedback: presenca?.link_feedback || "",
          dataCompleta: evento.dataHora,
          finalizado: finalizado,
          organizador: evento.organizador_ID?.nome || "Organizador"
        };
      });

      const pendentes = eventosFormatados.filter(e => e.status === "pendente");
      const aceitos = eventosFormatados.filter(e => e.status === "aceito");
      const recusados = eventosFormatados.filter(e => e.status === "recusado");
      const finalizados = eventosFormatados.filter(e => e.finalizado);

      console.log(`Resultado: ${pendentes.length}P, ${aceitos.length}A, ${recusados.length}R, ${finalizados.length}F`);

      return {
        pendentes,
        aceitos,
        recusados,
        finalizados
      };

    } catch (error) {
      console.error("Erro ao buscar eventos do funcionário:", error);
      throw new Error("Erro interno ao carregar eventos");
    }
  }

  async confirmarEvento(funcionarioId: number, eventoId: number) {
    try {
      console.log(`Confirmando evento ${eventoId} para funcionário ${funcionarioId}`);
      
      const convite = await this.convidadosRepo.findOne({
        where: { 
          funcionario_ID: funcionarioId, 
          evento_ID: eventoId 
        }
      });

      if (!convite) {
        throw new Error("Você não está convidado para este evento");
      }

      let presenca = await this.presencaRepo.findOne({
        where: { 
          funcionario_ID: funcionarioId, 
          evento_ID: eventoId 
        }
      });

      if (presenca) {
        presenca.presente = true;
        presenca.razao_recusa = "";
        presenca.data_termino = new Date();
      } else {
        presenca = this.presencaRepo.create({
          funcionario_ID: funcionarioId,
          evento_ID: eventoId,
          presente: true,
          razao_recusa: "",
          data_termino: new Date(),
          link_feedback: ""
        });
      }

      const resultado = await this.presencaRepo.save(presenca);

      return {
        success: true,
        message: "Evento confirmado com sucesso!",
        data: resultado
      };

    } catch (error) {
      console.error("Erro ao confirmar evento:", error);
      throw error;
    }
  }

  async recusarEvento(funcionarioId: number, eventoId: number, justificativa: string) {
    try {
      console.log(`Recusando evento ${eventoId} para funcionário ${funcionarioId}`);
      
      const convite = await this.convidadosRepo.findOne({
        where: { 
          funcionario_ID: funcionarioId, 
          evento_ID: eventoId 
        }
      });

      if (!convite) {
        throw new Error("Você não está convidado para este evento");
      }

      if (!justificativa?.trim()) {
        throw new Error("Justificativa é obrigatória");
      }

      let presenca = await this.presencaRepo.findOne({
        where: { 
          funcionario_ID: funcionarioId, 
          evento_ID: eventoId 
        }
      });

      if (presenca) {
        presenca.presente = false;
        presenca.razao_recusa = justificativa;
        presenca.data_termino = new Date();
      } else {
        presenca = this.presencaRepo.create({
          funcionario_ID: funcionarioId,
          evento_ID: eventoId,
          presente: false,
          razao_recusa: justificativa,
          data_termino: new Date(),
          link_feedback: ""
        });
      }

      const resultado = await this.presencaRepo.save(presenca);

      return {
        success: true,
        message: "Evento recusado com sucesso!",
        data: resultado
      };

    } catch (error) {
      console.error("Erro ao recusar evento:", error);
      throw error;
    }
  }

  async trocarStatusEvento(funcionarioId: number, eventoId: number, justificativa?: string) {
    try {
      console.log(`Trocando status do evento ${eventoId} para funcionário ${funcionarioId}`);
      
      const presenca = await this.presencaRepo.findOne({
        where: { 
          funcionario_ID: funcionarioId, 
          evento_ID: eventoId 
        }
      });

      if (!presenca) {
        throw new Error("Nenhuma participação encontrada para este evento");
      }
      const novoStatus = !presenca.presente;
      presenca.presente = novoStatus;
      presenca.razao_recusa = novoStatus ? "" : (justificativa || "");
      presenca.data_termino = new Date();

      const resultado = await this.presencaRepo.save(presenca);

      return {
        success: true,
        message: `Status alterado para ${novoStatus ? 'aceito' : 'recusado'} com sucesso!`,
        data: resultado
      };

    } catch (error) {
      console.error("Erro ao trocar status:", error);
      throw error;
    }
  }

  async avaliarEvento(funcionarioId: number, eventoId: number, linkFeedback: string) {
    try {
      console.log(`Avaliando evento ${eventoId} para funcionário ${funcionarioId}`);
      
      const presenca = await this.presencaRepo.findOne({
        where: { 
          funcionario_ID: funcionarioId, 
          evento_ID: eventoId,
          presente: true 
        }
      });

      if (!presenca) {
        throw new Error("Você não participou deste evento");
      }

      const evento = await this.eventoRepo.findOne({
        where: { evento_ID: eventoId }
      });

      if (!evento) {
        throw new Error("Evento não encontrado");
      }

      if (new Date(evento.dataHora) > new Date()) {
        throw new Error("Este evento ainda não aconteceu");
      }

      presenca.link_feedback = linkFeedback;
      const resultado = await this.presencaRepo.save(presenca);

      return {
        success: true,
        message: "Avaliação enviada com sucesso!",
        data: resultado
      };

    } catch (error) {
      console.error("Erro ao avaliar evento:", error);
      throw error;
    }
  }

  private formatarData(data: Date): string {
    return new Date(data).toLocaleDateString('pt-BR');
  }

  private formatarHora(data: Date): string {
    return new Date(data).toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    }) + 'h';
  }
}