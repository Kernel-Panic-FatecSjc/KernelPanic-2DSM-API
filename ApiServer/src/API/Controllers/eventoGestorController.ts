import { Request, Response } from "express";
import { EventoService } from "../../Business/Services/eventoGestorService";

const eventoService = new EventoService();

export class EventoController {
    async criarEvento(req: Request, res: Response): Promise<void> {
        try {
            // 1. Aqui você declarou a variável 'localizacao'
            const { titulo, descricao, dataHora, duracao_horas, evento_link, localizacao, organizador_ID, funcionariosConvidados } = req.body;

            if (!titulo || !descricao || !dataHora || !organizador_ID) {
                res.status(400).json({ error: "Campos obrigatórios faltando: titulo, descricao, dataHora, organizador_ID" });
                return;
            }

            const novoEvento = await eventoService.criarEvento({
                titulo: titulo as string,
                descricao: descricao as string,
                dataHora: new Date(dataHora as string),
                duracao_horas: duracao_horas ? parseFloat(duracao_horas as string) : 1,
                evento_link: evento_link as string || "",
                localizacao: localizacao as string || "", 
                organizador_ID: parseInt(organizador_ID as string),
                funcionariosConvidados: funcionariosConvidados || []
            });

            res.status(201).json(novoEvento);
        } catch (error: any) {
            console.error("Erro ao criar evento:", error);
            res.status(500).json({ error: error.message });
        }
    }

    async listarEventos(req: Request, res: Response): Promise<void> {
        try {
            const eventos = await eventoService.buscarTodosEventos();
            res.json(eventos);
        } catch (error: any) {
            console.error("Erro ao listar eventos:", error);
            res.status(500).json({ error: error.message });
        }
    }

    async buscarEvento(req: Request, res: Response): Promise<void> {
        try {
            const eventoId = parseInt(req.params.id as string);
            
            if (isNaN(eventoId)) {
                res.status(400).json({ error: "ID inválido" });
                return;
            }

            const evento = await eventoService.buscarEventoPorId(eventoId);
            
            if (!evento) {
                res.status(404).json({ error: "Evento não encontrado" });
                return;
            }

            res.json(evento);
        } catch (error: any) {
            console.error("Erro ao buscar evento:", error);
            res.status(500).json({ error: error.message });
        }
    }

    async atualizarEvento(req: Request, res: Response): Promise<void> {
        try {
            const eventoId = parseInt(req.params.id as string);
            
            if (isNaN(eventoId)) {
                res.status(400).json({ error: "ID inválido" });
                return;
            }

            const eventoAtualizado = await eventoService.atualizarEvento(eventoId, req.body);
            res.json(eventoAtualizado);
        } catch (error: any) {
            console.error("Erro ao atualizar evento:", error);
            res.status(500).json({ error: error.message });
        }
    }

    async excluirEvento(req: Request, res: Response): Promise<void> {
        try {
            const eventoId = parseInt(req.params.id as string);
            
            if (isNaN(eventoId)) {
                res.status(400).json({ error: "ID inválido" });
                return;
            }

            await eventoService.excluirEvento(eventoId);
            res.status(204).send();
        } catch (error: any) {
            console.error("Erro ao excluir evento:", error);
            res.status(500).json({ error: error.message });
        }
    }

    async buscarEventosFuncionario(req: Request, res: Response): Promise<void> {
        try {
            const funcionarioId = parseInt(req.params.id as string);
            
            if (isNaN(funcionarioId)) {
                res.status(400).json({ error: "ID do funcionário inválido" });
                return;
            }

            const eventos = await eventoService.buscarEventosDoFuncionario(funcionarioId);
            res.json(eventos);
        } catch (error: any) {
            console.error("Erro ao buscar eventos:", error);
            res.status(500).json({ error: error.message });
        }
    }
}