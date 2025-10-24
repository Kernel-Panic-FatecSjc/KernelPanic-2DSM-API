import { Request, Response } from "express";
import { VendedorService } from "../../Business/Services/vendedorService";

const vendedorService = new VendedorService();

export const getVendedor = async (req: Request, res: Response) => {
    try {
        const vendedores = await vendedorService.listarTodos();

        if (!vendedores.length) {
            return res.status(404).json({ message: "Nenhum vendedor encontrado." });
        }

        return res.status(200).json(vendedores);
    } catch (error) {
        console.error("Erro ao listar vendedores:", error);
        return res.status(500).json({ message: "Erro ao listar vendedores." });
    }
};