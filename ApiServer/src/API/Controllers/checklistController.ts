import { Request, Response } from "express";
import { ChecklistService } from "../../Business/Services/checklistService";

export const ChecklistController = {
  async create(req: Request, res: Response) {
    try {
      const { tipo, respostas, path_img } = req.body;
      const finalPathImg = path_img ?? null;
      const result = await ChecklistService.createChecklist(tipo, respostas, finalPathImg);
      res.status(201).json({ message: "Checklist salvo!", result });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  async getAll(req: Request, res: Response) {
    try {
      const result = await ChecklistService.getChecklists();
      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  async getByTipo(req: Request, res: Response) {
    try {
      const { tipo } = req.params;

      if (!tipo) {
        return res.status(400).json({ error: "O parâmetro 'tipo' é obrigatório." });
      }

      const result = await ChecklistService.getChecklistsByTipo(tipo);
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  },
};
