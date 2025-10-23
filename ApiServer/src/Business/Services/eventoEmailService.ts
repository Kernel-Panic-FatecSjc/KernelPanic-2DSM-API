import { AppDataSource } from "../../DAL/ormconfig";
import { Evento } from "../../DAL/Models/EventoEmail";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../../../.env") });

const eventoRepo = AppDataSource.getRepository(Evento);

export async function criarEvento(email: string, titulo: string, dataHora: Date, categoria: string) {
  const evento = eventoRepo.create({ email, titulo, dataHora, categoria });
  return await eventoRepo.save(evento);
}

export async function enviarEmail(email: string, titulo: string) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Agenda" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Lembrete do evento",
      text: `Você tem um evento agendado para hoje! Evento: ${titulo}`,
    });

    console.log(`Email enviado para ${email}`);
  } catch (err) {
    console.error("Falha ao enviar e-mail:", err);
  }
}

export async function listarEventos(): Promise<Evento[]>{
  return eventoRepo.find()
}