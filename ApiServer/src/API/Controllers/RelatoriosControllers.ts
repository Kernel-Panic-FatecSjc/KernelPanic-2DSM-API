import { Request, Response } from "express";
import * as RelatoriosService from "../../Business/Services/RelatoriosService";

// ========================
// ===== ADMINISTRATIVO =====
// ========================

export const getAvaliacaoEventos = async (req: Request, res: Response) => {
    try {
        await RelatoriosService.relatorioPresencaPorEvento(res, req.query);
    } catch (error) {
        console.error("Erro ao gerar Avaliação de Eventos:", error);
        res.status(500).json({ message: "Erro ao gerar Avaliação de Eventos" });
    }
};

export const getFuncionariosAdministrativo = async (req: Request, res: Response) => {
    try {
        await RelatoriosService.relatorioFuncionarios(res, req.query);
    } catch (error) {
        console.error("Erro ao gerar Relatório de Funcionários:", error);
        res.status(500).json({ message: "Erro ao gerar Relatório de Funcionários" });
    }
};

export const getEventos = async (req: Request, res: Response) => {
    try {
        await RelatoriosService.relatorioEventos(res, req.query);
    } catch (error) {
        console.error("Erro ao gerar Relatório de Eventos:", error);
        res.status(500).json({ message: "Erro ao gerar Relatório de Eventos" });
    }
};

export const getLocalizacao = async (req: Request, res: Response) => {
    try {
        await RelatoriosService.relatorioLocalizacaoFuncionarios(res, req.query);
    } catch (error) {
        console.error("Erro ao gerar Relatório de Localização:", error);
        res.status(500).json({ message: "Erro ao gerar Relatório de Localização" });
    }
};

export const getCalendario = async (req: Request, res: Response) => {
    try {
        await RelatoriosService.relatorioCalendario(res, req.query);
    } catch (error) {
        console.error("Erro ao gerar Relatório de Calendário:", error);
        res.status(500).json({ message: "Erro ao gerar Relatório de Calendário" });
    }
};

export const getDashboardAdministrativo = async (req: Request, res: Response) => {
    try {
        await RelatoriosService.relatorioDashboardAdministrativo(res, req.query);
    } catch (error) {
        console.error("Erro ao gerar Dashboard Administrativo:", error);
        res.status(500).json({ message: "Erro ao gerar Dashboard Administrativo" });
    }
};

// ========================
// ===== COMERCIAL =====
// ========================

export const getFunilVendas = async (req: Request, res: Response) => {
    try {
        await RelatoriosService.relatorioFunilVendas(res, req.query);
    } catch (error) {
        console.error("Erro ao gerar Funil de Vendas:", error);
        res.status(500).json({ message: "Erro ao gerar Funil de Vendas" });
    }
};

export const getFuncionariosComercial = async (req: Request, res: Response) => {
    try {
        await RelatoriosService.relatorioFuncionariosInteracoes(res, req.query);
    } catch (error) {
        console.error("Erro ao gerar Funcionários Comercial:", error);
        res.status(500).json({ message: "Erro ao gerar Funcionários Comercial" });
    }
};

export const getDesempenhoVendedores = async (req: Request, res: Response) => {
    try {
        await RelatoriosService.relatorioDesempenhoVendedores(res, req.query);
    } catch (error) {
        console.error("Erro ao gerar Desempenho Vendedores:", error);
        res.status(500).json({ message: "Erro ao gerar Desempenho Vendedores" });
    }
};

export const getGestaoVendas = async (req: Request, res: Response) => {
    try {
        await RelatoriosService.relatorioGestaoVendas(res, req.query);
    } catch (error) {
        console.error("Erro ao gerar Gestão de Vendas:", error);
        res.status(500).json({ message: "Erro ao gerar Gestão de Vendas" });
    }
};

export const getAgendamentos = async (req: Request, res: Response) => {
    try {
        await RelatoriosService.relatorioAgendamentos(res, req.query);
    } catch (error) {
        console.error("Erro ao gerar Agendamentos:", error);
        res.status(500).json({ message: "Erro ao gerar Agendamentos" });
    }
};

export const getDashboardComercial = async (req: Request, res: Response) => {
    try {
        await RelatoriosService.relatorioDashboardComercial(res, req.query);
    } catch (error) {
        console.error("Erro ao gerar Dashboard Comercial:", error);
        res.status(500).json({ message: "Erro ao gerar Dashboard Comercial" });
    }
};

// ========================
// ===== OPERACIONAL =====
// ========================

export const getRespostasFormularios = async (req: Request, res: Response) => {
    try {
        await RelatoriosService.relatorioFormulariosFuncionarios(res, req.query);
    } catch (error) {
        console.error("Erro ao gerar Formulários Funcionários:", error);
        res.status(500).json({ message: "Erro ao gerar Formulários Funcionários" });
    }
};

export const getFormulariosAgregados = async (req: Request, res: Response) => {
    try {
        await RelatoriosService.relatorioFormulariosAgregados(res, req.query);
    } catch (error) {
        console.error("Erro ao gerar Formulários Agregados:", error);
        res.status(500).json({ message: "Erro ao gerar Formulários Agregados" });
    }
};

export const getDashboardOperacional = async (req: Request, res: Response) => {
    try {
        await RelatoriosService.dashboardOperacional(res, req.query);
    } catch (error) {
        console.error("Erro ao gerar Dashboard Operacional:", error);
        res.status(500).json({ message: "Erro ao gerar Dashboard Operacional" });
    }
};