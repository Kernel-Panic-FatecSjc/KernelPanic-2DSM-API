import { Router } from "express";
import { FuncionarioController } from "../Controllers/FuncionarioController";

const router = Router();

router.get("/:id", FuncionarioController.getById);
router.put("/:id/localizacao", FuncionarioController.atualizarLocalizacao);

module.exports = router;
