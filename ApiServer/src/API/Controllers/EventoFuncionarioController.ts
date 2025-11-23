import { Request, Response } from "express";
import { EventosFuncionarioService } from "../../Business/Services/eventoFuncionarioService";

const service = new EventosFuncionarioService();

export class EventosFuncionarioController {
  static async buscarEventosDoFuncionario(req: Request, res: Response) {
    try {
      const funcionarioId = Number(req.params.funcionarioId);
      
      if (!funcionarioId || isNaN(funcionarioId)) {
        return res.status(400).json({ erro: "ID do funcionário inválido" });
      }

      const eventos = await service.buscarEventosDoFuncionario(funcionarioId);
      res.json(eventos);
    } catch (error) {
      console.error("Erro no controller buscarEventos:", error);
      res.status(500).json({ erro: (error as Error).message });
    }
  }

  static async confirmarEvento(req: Request, res: Response) {
    try {
      const { funcionario_id, evento_id } = req.body;

      if (!funcionario_id || !evento_id) {
        return res.status(400).json({ erro: "Dados incompletos" });
      }

      const resultado = await service.confirmarEvento(funcionario_id, evento_id);
      res.json(resultado);
    } catch (error) {
      console.error("Erro no controller confirmarEvento:", error);
      res.status(400).json({ erro: (error as Error).message });
    }
  }

  static async recusarEvento(req: Request, res: Response) {
    try {
      const { funcionario_id, evento_id, justificativa } = req.body;

      if (!funcionario_id || !evento_id || !justificativa) {
        return res.status(400).json({ erro: "Dados incompletos" });
      }

      const resultado = await service.recusarEvento(funcionario_id, evento_id, justificativa);
      res.json(resultado);
    } catch (error) {
      console.error("Erro no controller recusarEvento:", error);
      res.status(400).json({ erro: (error as Error).message });
    }
  }

  static async trocarStatusEvento(req: Request, res: Response) {
    try {
      const { funcionario_id, evento_id, justificativa } = req.body;

      if (!funcionario_id || !evento_id) {
        return res.status(400).json({ erro: "Dados incompletos" });
      }

      const resultado = await service.trocarStatusEvento(funcionario_id, evento_id, justificativa);
      res.json(resultado);
    } catch (error) {
      console.error("Erro no controller trocarStatusEvento:", error);
      res.status(400).json({ erro: (error as Error).message });
    }
  }

  static async avaliarEvento(req: Request, res: Response) {
    try {
      const { funcionario_id, evento_id, link_feedback } = req.body;

      if (!funcionario_id || !evento_id || !link_feedback) {
        return res.status(400).json({ erro: "Dados incompletos" });
      }

      const resultado = await service.avaliarEvento(funcionario_id, evento_id, link_feedback);
      res.json(resultado);
    } catch (error) {
      console.error("Erro no controller avaliarEvento:", error);
      res.status(400).json({ erro: (error as Error).message });
    }
  }
}