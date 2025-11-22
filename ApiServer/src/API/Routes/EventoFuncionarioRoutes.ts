import { Router } from "express";
import { EventosFuncionarioController } from "../Controllers/EventoFuncionarioController";

const router = Router();

router.get("/funcionario/:funcionarioId", EventosFuncionarioController.buscarEventosDoFuncionario);

router.post("/confirmar", EventosFuncionarioController.confirmarEvento);

router.post("/recusar", EventosFuncionarioController.recusarEvento);

router.post("/trocar-status", EventosFuncionarioController.trocarStatusEvento);

router.post("/avaliar", EventosFuncionarioController.avaliarEvento);

module.exports = router;