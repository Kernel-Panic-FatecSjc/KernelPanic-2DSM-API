import { Router } from "express";
import { EventoController } from "../Controllers/eventoGestorController";

const router = Router();
const eventoController = new EventoController();

router.post("/eventos", (req, res) => eventoController.criarEvento(req, res));
router.get("/eventos", (req, res) => eventoController.listarEventos(req, res));
router.get("/eventos/:id", (req, res) => eventoController.buscarEvento(req, res));
router.put("/eventos/:id", (req, res) => eventoController.atualizarEvento(req, res));
router.delete("/eventos/:id", (req, res) => eventoController.excluirEvento(req, res));

router.get("/eventos/funcionario/:id", (req, res) => eventoController.buscarEventosFuncionario(req, res));

module.exports = router;