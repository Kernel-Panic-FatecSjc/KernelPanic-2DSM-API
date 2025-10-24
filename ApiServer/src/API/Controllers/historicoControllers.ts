import { Request, Response } from "express";
import { HistoricoService } from "../../Business/Services/historicoService";
import { HistoricoFunilService } from "../../Business/Services/HistoricoFunilService";

const Service = new HistoricoService();


export const getInteracoes = async (req: Request, res: Response) => {
    try {
        const { termoBusca, ordenarPor, direcao } = req.query;

        const interacoes = await Service.listarInteracoes(
            termoBusca ? String(termoBusca) : undefined,
            (ordenarPor as keyof Awaited<ReturnType<typeof Service.listarInteracoes>>[number]) || "venda_ID",
            (direcao as "ASC" | "DESC") || "DESC"
        );

        return res.json(interacoes);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erro ao buscar interações" });
    }
};

export const getInteracoesID = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const interacao = await Service.listarPorID(id);

        if (!interacao) {
            return res.status(404).json({ message: "Interação não encontrada" });
        }

        return res.json(interacao);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erro ao buscar interação" });
    }
};

export const getMovimentacoes = async(req: Request, res: Response) => {
    try{
        const historicoFunilRepo = new HistoricoFunilService()
        const historico = await historicoFunilRepo.listarHistorico();

        if (!historico) {
            return res.status(404).json({ message: "Interação não encontrada" });
        }

        return res.json(historico);
        
    }catch(err){
        console.error
        return res.status(500).json({ message: "Erro ao buscar interação" });
    }
}