import { Router } from "express";
import { RecusaController } from "../Controllers/RecusaController";

const router = Router();
const recusaController = new RecusaController();

router.get("/recusas/eventos", (req, res) => recusaController.listarRecusasComJustificativa(req, res));
router.get("/recusas/evento/:id", (req, res) => recusaController.buscarRecusasEvento(req, res));

module.exports = router;