import nodemailer from "nodemailer";
import PDFDocument from "pdfkit";
import dotenv from "dotenv";
import path from "path";

// DEBUG: Carregar .env explicitamente
const envPath = path.resolve(__dirname, "../../../../.env");
console.log("🔍 Tentando carregar .env de:", envPath);

dotenv.config({ path: envPath });

// DEBUG: Verificar se as variáveis estão carregando
console.log("📧 Variáveis de ambiente:");
console.log("EMAIL_USER:", process.env.EMAIL_USER || "❌ NÃO CONFIGURADO");
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "✅ CONFIGURADO (oculto)" : "❌ NÃO CONFIGURADO");

// DEBUG: Listar todas as variáveis de ambiente que começam com EMAIL
console.log("🔎 Todas as variáveis EMAIL_*:");
Object.keys(process.env).forEach(key => {
  if (key.startsWith('EMAIL_')) {
    console.log(`  ${key}:`, key.includes('PASS') ? '***' : process.env[key]);
  }
});

interface FormDataAgregado {
  genero: string;
  nomeMotorista: string;
  CNPJMotorista: string;
  CPFMotorista: string;
  dataMotorista: string;
  cidadeMotorista: string;
  telefoneMotorista: string;
  emailMotorista: string;
  RGMotorista: string;
  RGEmissaoMotorista: string;
  orgaoMotorista: string;
  nomePaiMotorista: string;
  nomeMaeMotorista: string;
  pisMotorista: string;
  CEPMotorista: string;
  enderecoMotorista: string;
  nomeProprietarioVeiculo: string;
  placaVeiculo: string;
  marcaVeiculo: string;
  modeloVeiculo: string;
  corVeiculo: string;
  anoVeiculo: string;
  cilindradaVeiculo: string;
  bau: string;
  seguro: string;
  valorMin: string;
  valorMinKM: string;
}

export class EmailCadastroService {
  
  async enviarEmailCadastroAgregado(formData: FormDataAgregado): Promise<{ success: boolean; message: string }> {
    try {
      if (!formData.emailMotorista || formData.emailMotorista.trim() === '') {
        return { success: false, message: "Email do motorista não informado" };
      }

      // DEBUG: Verificar credenciais antes de continuar
      if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.error("❌ CREDENCIAIS FALTANDO:");
        console.error("EMAIL_USER:", process.env.EMAIL_USER);
        console.error("EMAIL_PASS:", process.env.EMAIL_PASS ? "EXISTE" : "NÃO EXISTE");
        throw new Error("Credenciais de email não configuradas no .env");
      }

      console.log("✅ Credenciais encontradas, gerando PDF...");

      const pdfBuffer = await this.gerarPDFAgregado(formData);
      
      console.log("✅ PDF gerado, configurando transporter...");

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
        debug: true,
        logger: true
      });

      console.log("✅ Transporter configurado, verificando conexão...");

      // Verificar se a conexão funciona
      await transporter.verify();
      console.log("✅ Conexão com servidor de email verificada");

      console.log("📤 Enviando email para:", formData.emailMotorista);

      await transporter.sendMail({
        from: `"Sistema de Cadastro" <${process.env.EMAIL_USER}>`,
        to: formData.emailMotorista,
        subject: "Confirmação de Cadastro - Formulário de Agregado",
        html: this.gerarTemplateEmail(formData.nomeMotorista),
        attachments: [
          {
            filename: `cadastro_agregado_${formData.nomeMotorista.replace(/\s/g, '_')}.pdf`,
            content: pdfBuffer,
            contentType: 'application/pdf'
          }
        ]
      });

      console.log(`✅ Email com PDF enviado para ${formData.emailMotorista}`);
      return { success: true, message: "Email enviado com sucesso" };
      
    } catch (err: any) {
      console.error("❌ Falha ao enviar e-mail com PDF:", err);
      throw new Error(`Erro ao enviar email: ${err.message}`);
    }
  }

  private gerarTemplateEmail(nomeMotorista: string): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { 
            font-family: Arial, sans-serif; 
            color: #333; 
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
          }
          .container { 
            max-width: 600px; 
            margin: 0 auto; 
            background: white;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }
          .header { 
            background: #2c5aa0; 
            padding: 30px 20px; 
            text-align: center; 
            color: white;
          }
          .content { 
            padding: 30px; 
            line-height: 1.6;
          }
          .footer { 
            background: #f8f9fa; 
            padding: 20px; 
            text-align: center; 
            font-size: 12px; 
            color: #666;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✅ Cadastro Realizado com Sucesso!</h1>
          </div>
          <div class="content">
            <p>Prezado(a) <strong>${nomeMotorista}</strong>,</p>
            <p>Seu cadastro como agregado foi realizado com sucesso em nosso sistema.</p>
            <p>Em anexo você encontrará um PDF com todos os dados cadastrados para sua conferência.</p>
            <p><strong>Importante:</strong> Guarde este documento para futuras referências.</p>
          </div>
          <div class="footer">
            <p>Este é um email automático, por favor não responda.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  private async gerarPDFAgregado(formData: FormDataAgregado): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      try {
        const doc = new PDFDocument({
          margin: 50,
          size: 'A4',
        });

        const buffers: Buffer[] = [];

        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', () => {
          const pdfData = Buffer.concat(buffers);
          resolve(pdfData);
        });

        // Cabeçalho
        doc.fontSize(16)
           .text('COMPROVANTE DE CADASTRO - AGREDADO', 50, 50, { align: 'center' });
        
        doc.fontSize(10)
           .text(`Emitido em: ${new Date().toLocaleDateString('pt-BR')}`, 50, 80, { align: 'right' });

        let yPosition = 120;

        // Informações Pessoais
        doc.fontSize(14).text('INFORMAÇÕES PESSOAIS', 50, yPosition);
        yPosition += 30;

        doc.fontSize(10);
        const infoPessoal = [
          `Gênero: ${formData.genero || 'Não informado'}`,
          `Nome: ${formData.nomeMotorista || 'Não informado'}`,
          `CPF: ${this.formatarCPF(formData.CPFMotorista)}`,
          `CNPJ: ${this.formatarCNPJ(formData.CNPJMotorista)}`,
          `Data Nascimento: ${this.formatarData(formData.dataMotorista)}`,
          `Cidade: ${formData.cidadeMotorista || 'Não informado'}`,
          `Telefone: ${this.formatarTelefone(formData.telefoneMotorista)}`,
          `Email: ${formData.emailMotorista || 'Não informado'}`,
          `RG: ${formData.RGMotorista || 'Não informado'}`,
          `Emissão RG: ${this.formatarData(formData.RGEmissaoMotorista)}`,
          `Órgão: ${formData.orgaoMotorista || 'Não informado'}`,
          `PIS: ${formData.pisMotorista || 'Não informado'}`,
          `Nome do Pai: ${formData.nomePaiMotorista || 'Não informado'}`,
          `Nome da Mãe: ${formData.nomeMaeMotorista || 'Não informado'}`
        ];

        infoPessoal.forEach((info) => {
          if (yPosition > 700) {
            doc.addPage();
            yPosition = 50;
          }
          doc.text(info, 50, yPosition);
          yPosition += 20;
        });

        yPosition += 10;

        // Endereço
        if (yPosition > 650) {
          doc.addPage();
          yPosition = 50;
        }
        doc.fontSize(14).text('ENDEREÇO', 50, yPosition);
        yPosition += 30;
        doc.fontSize(10);
        doc.text(`CEP: ${this.formatarCEP(formData.CEPMotorista)}`, 50, yPosition);
        yPosition += 20;
        doc.text(`Endereço: ${formData.enderecoMotorista || 'Não informado'}`, 50, yPosition);
        yPosition += 30;

        // Veículo
        if (yPosition > 600) {
          doc.addPage();
          yPosition = 50;
        }
        doc.fontSize(14).text('VEÍCULO', 50, yPosition);
        yPosition += 30;
        doc.fontSize(10);
        
        const infoVeiculo = [
          `Proprietário: ${formData.nomeProprietarioVeiculo || 'Não informado'}`,
          `Placa: ${formData.placaVeiculo || 'Não informado'}`,
          `Marca: ${formData.marcaVeiculo || 'Não informado'}`,
          `Modelo: ${formData.modeloVeiculo || 'Não informado'}`,
          `Cor: ${formData.corVeiculo || 'Não informado'}`,
          `Ano: ${formData.anoVeiculo || 'Não informado'}`,
          `Cilindrada: ${formData.cilindradaVeiculo || 'Não informado'}`,
          `Baú: ${formData.bau || 'Não informado'}`,
          `Seguro: ${formData.seguro || 'Não informado'}`
        ];

        infoVeiculo.forEach(info => {
          if (yPosition > 700) {
            doc.addPage();
            yPosition = 50;
          }
          doc.text(info, 50, yPosition);
          yPosition += 20;
        });

        yPosition += 10;

        // Valores
        if (yPosition > 650) {
          doc.addPage();
          yPosition = 50;
        }
        doc.fontSize(14).text('VALORES', 50, yPosition);
        yPosition += 30;
        doc.fontSize(10);
        doc.text(`Valor Mínimo por Saída: ${formData.valorMin || 'Não informado'}`, 50, yPosition);
        yPosition += 20;
        doc.text(`Valor Mínimo por KM: ${formData.valorMinKM || 'Não informado'}`, 50, yPosition);

        // Rodapé
        doc.fontSize(8)
           .text('Documento gerado automaticamente - Sistema de Cadastro', 
                 50, 750, { align: 'center' });

        doc.end();
      } catch (error) {
        reject(error);
      }
    });
  }

  // Funções auxiliares de formatação
  private formatarData(data: string): string {
    if (!data) return 'Não informado';
    try {
      return new Date(data).toLocaleDateString('pt-BR');
    } catch {
      return data;
    }
  }

  private formatarCPF(cpf: string): string {
    if (!cpf) return 'Não informado';
    const cleaned = cpf.replace(/\D/g, '');
    if (cleaned.length === 11) {
      return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    return cpf;
  }

  private formatarCNPJ(cnpj: string): string {
    if (!cnpj) return 'Não informado';
    const cleaned = cnpj.replace(/\D/g, '');
    if (cleaned.length === 14) {
      return cleaned.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    }
    return cnpj;
  }

  private formatarTelefone(telefone: string): string {
    if (!telefone) return 'Não informado';
    const cleaned = telefone.replace(/\D/g, '');
    if (cleaned.length === 11) {
      return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (cleaned.length === 10) {
      return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    return telefone;
  }

  private formatarCEP(cep: string): string {
    if (!cep) return 'Não informado';
    const cleaned = cep.replace(/\D/g, '');
    if (cleaned.length === 8) {
      return cleaned.replace(/(\d{5})(\d{3})/, '$1-$2');
    }
    return cep;
  }
}