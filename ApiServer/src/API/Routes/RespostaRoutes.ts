import { Router } from "express";
import { RespostaController } from "../Controllers/RespostaController";

const router = Router();
const respostaController = new RespostaController();

router.get("/respostas/funcionarios", (req, res) => respostaController.listarRespostasFuncionarios(req, res));
router.get("/respostas/evento/:id", (req, res) => respostaController.buscarRespostasPorEvento(req, res));

module.exports = router;