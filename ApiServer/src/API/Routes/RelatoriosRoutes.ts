import express from "express";
import {
  getAvaliacaoEventos,
  getFuncionariosAdministrativo,
  getEventos,
  getLocalizacao,
  getCalendario,
  getDashboardAdministrativo,
  getFunilVendas,
  getFuncionariosComercial,
  getDesempenhoVendedores,
  getGestaoVendas,
  getAgendamentos,
  getDashboardComercial,
  getRespostasFormularios,
  getFormulariosAgregados,
  getDashboardOperacional,
} from "../Controllers/RelatoriosControllers";

const router = express.Router();

// ===== ADMINISTRATIVO =====
router.get("/administrativo/avaliacao-eventos", getAvaliacaoEventos);
router.get("/administrativo/funcionarios", getFuncionariosAdministrativo);
router.get("/administrativo/eventos", getEventos);
router.get("/administrativo/localizacao", getLocalizacao);
router.get("/administrativo/calendario", getCalendario);
router.get("/administrativo/dashboard", getDashboardAdministrativo);

// ===== COMERCIAL =====
router.get("/comercial/funil-vendas", getFunilVendas);
router.get("/comercial/funcionarios", getFuncionariosComercial);
router.get("/comercial/desempenho-vendedores", getDesempenhoVendedores);
router.get("/comercial/gestao-vendas", getGestaoVendas);
router.get("/comercial/agendamentos", getAgendamentos);
router.get("/comercial/dashboard", getDashboardComercial);

// ===== OPERACIONAL =====
router.get("/operacional/respostas-formularios", getRespostasFormularios);
router.get("/operacional/motoristas", getFormulariosAgregados);
router.get("/operacional/dashboard", getDashboardOperacional);

module.exports = router;