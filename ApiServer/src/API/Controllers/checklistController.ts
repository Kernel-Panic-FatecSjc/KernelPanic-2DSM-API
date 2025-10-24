import { Request, Response } from "express";
import { ChecklistService } from "../../Business/Services/checklistService";

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
            if (typeof respostas === "string") {
                try {
                    respostasParsed = JSON.parse(respostas);
                } catch {
                    return res.status(400).json({
                        error: "Formato das respostas é inválido.",
                    });
                }
            }

            const result = await this.checklistService.createChecklist(
                tipo,
                respostasParsed,
                filePath
            );

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
                return res
                    .status(400)
                    .json({ error: "O parâmetro 'tipo' é obrigatório." });
            }

            const result = await this.checklistService.getChecklistsByTipo(tipo);
            return res.status(200).json(result);
        } catch (error: any) {
            console.error("Erro ao buscar checklist por tipo:", error);
            return res.status(500).json({ error: error.message });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { formID } = req.body;

            if (!formID) {
                return res.status(400).json({
                    error: "O parâmetro 'formID' é obrigatório.",
                });
            }

            const result = await this.checklistService.deleteChecklist(
                Number(formID)
            );

            if (!result) {
                return res.status(404).json({ error: "Checklist não encontrado." });
            }

            return res
                .status(200)
                .json({ message: "Checklist deletado com sucesso." });
        } catch (error: any) {
            console.error("Erro ao deletar checklist:", error);
            return res.status(500).json({ error: error.message });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const file = (req as Request & { file?: { path: string } }).file;
            const filePath = file ? file.path : null;
            const { tipo, respostas } = req.body;

            if (!id) {
                return res.status(400).json({
                    error: "O parâmetro 'id' é obrigatório.",
                });
            }

            let respostasParsed = respostas;
            if (typeof respostas === "string") {
                try {
                    respostasParsed = JSON.parse(respostas);
                } catch {
                    return res.status(400).json({
                        error: "Formato das respostas é inválido.",
                    });
                }
            }

            const result = await this.checklistService.updateChecklist(
                Number(id),
                tipo,
                respostasParsed,
                filePath
            );

            if (!result) {
                return res
                    .status(404)
                    .json({ error: "Checklist não encontrado." });
            }

            return res.status(200).json({
                message: "Checklist atualizado com sucesso!",
                result,
            });
        } catch (error: any) {
            console.error("Erro ao atualizar checklist:", error);
            return res.status(500).json({ error: error.message });
        }
    }
}

export const checklistController = new ChecklistController();
