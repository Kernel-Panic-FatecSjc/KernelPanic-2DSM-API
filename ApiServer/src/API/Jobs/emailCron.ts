import cron from "node-cron";
import { AppDataSource } from "../../DAL/ormconfig";
import { Evento } from "../../DAL/Models/EventoEmail";
import { enviarEmail } from "../../Business/Services/eventoEmailService";

export function iniciarCron() {
  // ===== Agenda tarefa para rodar a cada minuto =====
  cron.schedule("* * * * *", async () => {
    const agora = new Date();

    // ===== Define janela de 30 segundos antes e depois do momento atual =====
    const inicio = new Date(agora.getTime() - 30000);
    const fim = new Date(agora.getTime() + 30000);

    // ===== Busca eventos cuja dataHora está dentro dessa janela =====
    const eventos = await AppDataSource.getRepository(Evento)
      .createQueryBuilder("evento")
      .where("evento.dataHora BETWEEN :inicio AND :fim", { inicio, fim })
      .getMany();

    // ===== Envia email para cada evento encontrado =====
    eventos.forEach(ev => enviarEmail(ev.email, ev.titulo));
  });
}