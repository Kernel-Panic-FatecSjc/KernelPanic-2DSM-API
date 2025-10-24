import { Request, Response } from "express";
import { ChecklistService } from "../../Business/Services/cadastroAgregadoService";

export class ChecklistController {
  private checklistService: ChecklistService;

  constructor() {
    this.checklistService = new ChecklistService();
  }

  async create(req: Request, res: Response) {
    try {
      const file = (req as Request & { file?: { path: string } }).file;
      const filePath = file ? file.path : null;

      const { tipo, respostas } = req.body;

      let respostasParsed = respostas;
      if (typeof respostas === 'string') {
        try {
          respostasParsed = JSON.parse(respostas);
        } catch (error) {
          return res.status(400).json({ 
            error: "Formato das respostas é inválido." 
          });
        }
      }

      const result = await this.checklistService.createChecklist(tipo, respostasParsed, filePath);

      return res.status(201).json({
        message: "Checklist salvo com sucesso!",
        result,
      });
    } catch (error: any) {
      console.error("Erro ao criar checklist:", error);
      return res.status(400).json({ error: error.message });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const result = await this.checklistService.getChecklists();
      return res.status(200).json(result);
    } catch (error: any) {
      console.error("Erro ao buscar checklists:", error);
      return res.status(500).json({ error: error.message });
    }
  }

  async getByTipo(req: Request, res: Response) {
    try {
      const { tipo } = req.params;

      if (!tipo) {
        return res.status(400).json({ error: "O parâmetro 'tipo' é obrigatório." });
      }

      const result = await this.checklistService.getChecklistsByTipo(tipo);
      return res.status(200).json(result);
    } catch (error: any) {
      console.error("Erro ao buscar checklist por tipo:", error);
      return res.status(500).json({ error: error.message });
    }
  }
}

export const checklistController = new ChecklistController();
