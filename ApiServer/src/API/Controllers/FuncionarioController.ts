import { Request, Response } from "express";
import { FuncionarioService } from "../../Business/Services/FuncionarioService";

const service = new FuncionarioService();

export class FuncionarioController {
  static async getById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const funcionario = await service.getById(id);
      res.json(funcionario);
    } catch (error) {
      res.status(400).json({ erro: (error as Error).message });
    }
  }

  static async atualizarLocalizacao(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const { localizacao_funcionario } = req.body;
      if (!localizacao_funcionario) throw new Error("O campo 'localizacao' é obrigatório");
      const funcionario = await service.atualizarLocalizacao(id, localizacao_funcionario);
      res.json({ mensagem: "Localização atualizada com sucesso", funcionario });
    } catch (error) {
      res.status(400).json({ erro: (error as Error).message });
    }
  }
}


