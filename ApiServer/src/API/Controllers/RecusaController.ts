import { Request, Response } from "express";
import { RecusaService } from "../../Business/Services/RecusaService";

const recusaService = new RecusaService();

export class RecusaController {

    async listarRecusasComJustificativa(req: Request, res: Response): Promise<void> {
        try {
            const eventos = await recusaService.buscarRecusasComJustificativa();
            res.json(eventos);
        } catch (error: any) {
            console.error("Erro ao listar recusas:", error);
            res.status(500).json({ error: error.message });
        }
    }

    async buscarRecusasEvento(req: Request, res: Response): Promise<void> {
        try {
            const eventoId = parseInt(req.params.id as string);
            
            if (isNaN(eventoId)) {
                res.status(400).json({ error: "ID do evento inválido" });
                return;
            }

            const evento = await recusaService.buscarRecusasPorEvento(eventoId);
            res.json(evento);
        } catch (error: any) {
            console.error("Erro ao buscar recusas do evento:", error);
            res.status(500).json({ error: error.message });
        }
    }
}