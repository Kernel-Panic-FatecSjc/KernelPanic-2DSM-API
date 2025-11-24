import { Request, Response } from "express";
import { RespostaService } from "../../Business/Services/RespostasService";

const respostaService = new RespostaService();

export class RespostaController {

    async listarRespostasFuncionarios(req: Request, res: Response): Promise<void> {
        try {
            const respostas = await respostaService.buscarRespostasSimplificado();
            res.json(respostas);
        } catch (error: any) {
            console.error("Erro ao listar respostas:", error);
            res.status(500).json({ error: error.message });
        }
    }

    async buscarRespostasPorEvento(req: Request, res: Response): Promise<void> {
        try {
            const eventoId = parseInt(req.params.id as string);
            
            if (isNaN(eventoId)) {
                res.status(400).json({ error: "ID do evento inválido" });
                return;
            }

            const respostas = await respostaService.buscarRespostasPorEvento(eventoId);
            res.json(respostas);
        } catch (error: any) {
            console.error("Erro ao buscar respostas do evento:", error);
            res.status(500).json({ error: error.message });
        }
    }
}