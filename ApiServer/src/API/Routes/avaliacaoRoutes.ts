import { Router } from "express";
import { AvaliacaoController } from "../Controllers/avaliacaoController";

const router = Router();
const avaliacaoController = new AvaliacaoController();

router.get("/avaliacoes/eventos", (req, res) => avaliacaoController.listarEventosComAvaliacoes(req, res));

module.exports = router;