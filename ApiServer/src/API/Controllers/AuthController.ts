import { Request, Response } from "express";
import { AuthService } from "../../Business/Services/AuthService";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async login(req: Request, res: Response): Promise<Response> {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({
        statusCode: 400,
        message: "Os campos e-mail e senha são obrigatórios.",
      });
    }

    try {
      const resultado = await this.authService.login({ email, senha });

      return res.status(200).json(resultado);
    } catch (error: any) {
      return res.status(401).json({
        statusCode: 401,
        message: error.message,
      });
    }
  }
}