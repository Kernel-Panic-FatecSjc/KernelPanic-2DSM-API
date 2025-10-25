import { Request, Response } from "express";
import { EmailCadastroService } from "../../Business/Services/emailAgregadoService";

export class EmailCadastroController {
  private emailService: EmailCadastroService;

  constructor() {
    this.emailService = new EmailCadastroService();
  }

  async enviarEmailCadastro(req: Request, res: Response) {
    try {
      const formData = req.body;

      console.log("📨 Recebendo solicitação de email para:", formData.emailMotorista);

      const resultado = await this.emailService.enviarEmailCadastroAgregado(formData);

      if (resultado.success) {
        res.status(200).json({
          success: true,
          message: resultado.message
        });
      } else {
        res.status(400).json({
          success: false,
          message: resultado.message
        });
      }

    } catch (error: any) {
      console.error("❌ Erro no controller de email:", error);
      res.status(500).json({
        success: false,
        message: error.message || "Erro interno do servidor"
      });
    }
  }
}