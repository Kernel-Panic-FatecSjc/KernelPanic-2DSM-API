import { Request, Response } from "express";
import { AvaliacaoService } from "../../Business/Services/avaliacaoService";

const avaliacaoService = new AvaliacaoService();

export class AvaliacaoController {
    async listarEventosComAvaliacoes(req: Request, res: Response): Promise<void> {
        try {
            const eventos = await avaliacaoService.buscarEventosComAvaliacoes();
            res.json(eventos);
        } catch (error: any) {
            console.error("Erro ao listar eventos com avaliações:", error);
            res.status(500).json({ error: error.message });
        }
    }
}