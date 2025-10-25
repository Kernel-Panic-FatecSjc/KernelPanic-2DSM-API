import { AppDataSource } from "../../DAL/ormconfig";
import { Lembrete } from "../../DAL/Models/Lembrete";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";
import juice from "juice";

dotenv.config({ path: path.resolve(__dirname, "../../../../.env") });

const lembreteRepo = AppDataSource.getRepository(Lembrete);

export async function criarLembrete(email: string, titulo: string, dataHora: Date, categoria: string) {
  const evento = lembreteRepo.create({ email, titulo, dataHora, categoria });
  return await lembreteRepo.save(evento);
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


      const html = `
  <html>
    <head>
      <meta charset="UTF-8" />
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f2f2f2;
          margin: 0;
          padding: 0;
        }

        .email-container {
          max-width: 600px;
          margin: 0 auto;
          background: #ffffff;
          border-radius: 6px;
          overflow: hidden;
        }

        .header {
          text-align: center;
          padding: 40px 20px 10px;
        }

        .header img {
          width: 160px;
        }

        .title {
          font-size: 18px;
          font-weight: 600;
          text-align: center;
          color: #333;
          margin: 30px 20px 10px;
        }

        .content {
          font-size: 14px;
          line-height: 1.6;
          color: #333;
          padding: 0 40px 20px;
          text-align: justify;
        }

        .btn {
          display: inline-block;
          background-color: #1e56f0;
          color: white;
          text-decoration: none;
          padding: 12px 30px;
          border-radius: 4px;
          font-weight: bold;
          margin: 20px auto;
        }

        .btn-container {
          text-align: center;
        }

        .wave {
          background-color: #1e56f0;
          text-align: center;
          padding: 40px 20px;
          margin-top: 40px;
        }

        .wave img {
          width: 130px;
          margin-bottom: 15px;
        }

        .wave p {
          font-size: 12px;
          line-height: 1.4;
          color: #ffffff;
          margin: 8px 0 0;
        }
      </style>
    </head>

    <body>
      <div class="email-container">
        <div class="header">
          <!-- LOGO SUPERIOR -->
          <img src="https://seu-servidor.com/logo-superior.png" alt="Newe Logística Integrada" />
        </div>

        <div class="title">
          Você tem um lembrete agendado para hoje!<br />
          Evento: <strong>${titulo}</strong>
        </div>

        <div class="content">
          <p>
            Este é um lembrete automático do sistema Newe. 
            Confira os detalhes do seu evento e garanta que tudo esteja pronto.
          </p>

          <p>
            Caso precise mais informações, acesse nosso portal.
          </p>

          <div class="btn-container">
            <a href="https://newe.com.br" class="btn">Acesse o site</a>
          </div>
        </div>

        <div class="wave">
          <!-- LOGO INFERIOR -->
          <img src="/images/logonewebranco.png alt="Newe Rodapé" />
          <p>© 2025 Newe. Todos os direitos reservados.</p>
          <p>
            O uso não autorizado do conteúdo deste site pode violar leis civis e criminais
            e será tratado conforme a legislação vigente.
          </p>
        </div>
      </div>
    </body>
  </html>
  `;

    const htmlInline = juice(html);


    await transporter.sendMail({
      from: `"Agenda" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Lembrete do evento",
      html: htmlInline,
    });

    console.log(`Email enviado para ${email}`);
  } catch (err) {
    console.error("Falha ao enviar e-mail:", err);
  }
}

export async function listarLembretes(): Promise<Lembrete[]>{
  return lembreteRepo.find()
}