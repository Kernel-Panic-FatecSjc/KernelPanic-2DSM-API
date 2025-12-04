import { Request, Response } from "express";
import { FuncionarioPerfilService } from "../../Business/Services/FuncionarioPerfilService";

const service = new FuncionarioPerfilService();

export class FuncionarioPerfilController {
    static async listar(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const perfis = await service.listarPerfis(id);
            res.json(perfis);
        } catch (error) {
            res.status(400).json({ erro: (error as Error).message });
        }
    }

    static async adicionar(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const { perfis } = req.body;

            const funcionario = await service.adicionarPerfis(id, perfis);
            res.json(funcionario);
        } catch (error) {
            res.status(400).json({ erro: (error as Error).message });
        }
    }

    static async adicionarTodos(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const { perfis } = req.body;

            const funcionario = await service.adicionarTodosPerfis(id, perfis);
            res.json(funcionario);
        } catch (error) {
            res.status(400).json({ erro: (error as Error).message });
        }
    }

    static async remover(req: Request, res: Response) {
        try {
            const funcionarioId = Number(req.params.id);
            const perfilId = Number(req.params.perfilId);
            const resultado = await service.removerPerfil(
                funcionarioId,
                perfilId
            );
            res.json(resultado);
        } catch (error) {
            res.status(400).json({ erro: (error as Error).message });
        }
    }
}
