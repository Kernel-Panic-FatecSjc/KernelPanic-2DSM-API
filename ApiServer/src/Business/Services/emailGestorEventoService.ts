import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";

const envPath = path.resolve(__dirname, "../../../../.env");
console.log("🔍 Tentando carregar .env de:", envPath);

dotenv.config({ path: envPath });

// DEBUG
console.log("📧 Variáveis de ambiente:");
console.log("EMAIL_USER:", process.env.EMAIL_USER || "❌ NÃO CONFIGURADO");
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "✅ CONFIGURADO (oculto)" : "❌ NÃO CONFIGURADO");

console.log("🔎 Todas as variáveis EMAIL_*:");
Object.keys(process.env).forEach(key => {
  if (key.startsWith("EMAIL_")) {
    console.log(`  ${key}:`, key.includes("PASS") ? "***" : process.env[key]);
  }
});

interface FormDataFuncionario {
  genero: string;
  nomeFuncionario: string;
  numero_telefone: string;
  emailFuncionario: string;
  enderecoFuncionario: string;
  cargoFuncionario: string;
  localizacaoFuncionario: string;
}

interface FormDataEvento {
  titulo: string;
  data: Date;
  horario: string;
  local: string;
}

export class EmailCadastroService {


  async enviarEmailCadastroAgregado(
    formData: FormDataFuncionario,
    dadosEvento: FormDataEvento
  ): Promise<{ success: boolean; message: string }> {

    try {
      if (!formData.emailFuncionario || formData.emailFuncionario.trim() === "") {
        return { success: false, message: "Email do funcionário não informado" };
      }

      if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.error("❌ CREDENCIAIS FALTANDO:");
        throw new Error("Credenciais de email não configuradas no .env");
      }

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
        debug: true,
        logger: true,
      });

      console.log("✅ Transporter configurado, verificando conexão...");
      await transporter.verify();
      console.log("✅ Conexão com servidor de email verificada");

      console.log("📤 Enviando email para:", formData.emailFuncionario);

      await transporter.sendMail({
        from: `"Sistema de Cadastro" <${process.env.EMAIL_USER}>`,
        to: formData.emailFuncionario,
        subject: "Confirmação de Cadastro - Formulário de Funcionário",
        html: this.gerarTemplateEmail(formData.nomeFuncionario, dadosEvento),
      });

      console.log(`✅ Email enviado para ${formData.emailFuncionario}`);
      return { success: true, message: "Email enviado com sucesso" };

    } catch (err: any) {
      console.error("❌ Falha ao enviar email:", err);
      throw new Error(`Erro ao enviar email: ${err.message}`);
    }
  }


  private gerarTemplateEmail(nomeFuncionario: string, dadosEvento: FormDataEvento): string {
    return `
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="UTF-8" />
    <style>
        body {
        margin: 0;
        padding: 0;
        background-color: #f4f4f4;
        font-family: Arial, sans-serif;
        }

        .container {
        max-width: 600px;
        margin: 0 auto;
        background: #ffffff;
        border-radius: 8px;
        overflow: hidden;
        }

        .header {
        background-color: #3366FF;
        color: #ffffff;
        padding: 30px;
        text-align: center;
        font-size: 28px;
        font-weight: bold;

        }

        .content {
        padding: 25px 30px;
        font-size: 16px;
        color: #333333;
        line-height: 1.5;
        }

        .card {
        background: #EEF3FF;
        padding: 20px;
        border-left: 4px solid #3366FF;
        margin: 20px 0;
        border-radius: 5px;
        }

        .row strong {
        color: #3366FF;
        }

        .button-container {
        text-align: center;
        margin: 30px 0;
        }

        .button {
        background-color: #3366FF;
        color: white;
        padding: 12px 25px;
        border-radius: 6px;
        text-decoration: none;
        font-size: 16px;
        display: inline-block;
        }

        .footer {
        padding: 20px 30px;
        background-color: #f4f4f4;
        text-align: center;
        font-size: 12px;
        color: #666666;
        }
    </style>
    </head>
    <body>

    <div class="container">
        
        <div class="header">
        Novo Evento Criado
        </div>

        <div class="content">
        <p>Olá, <strong>${nomeFuncionario}</strong>!</p>
        <p>Um novo evento foi criado e pode ser de seu interesse:</p>

        <div class="card">
            <p class="row"><strong>Título:</strong> ${dadosEvento.titulo}</p>
            <p class="row"><strong>Data:</strong> ${new Date(dadosEvento.data).toLocaleDateString("pt-BR")}</p>
            <p class="row"><strong>Horário:</strong> ${dadosEvento.horario}</p>
            <p class="row"><strong>Local:</strong> ${dadosEvento.local}</p>
        </div>

        <p>Mais detalhes sobre o evento serão compartilhados em breve.</p>

        <div class="button-container">
            <a href="#" class="button">Ver Detalhes do Evento</a>
        </div>
        </div>

        <div class="footer">
        Se você não pretende participar ou tem alguma dúvida, entre em contato com a equipe de organização.
        </div>

    </div>

    </body>
    </html>
    `;
  }
}
