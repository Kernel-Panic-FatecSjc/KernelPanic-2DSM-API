import { Router } from "express";
import { FuncionarioPerfilController } from "../Controllers/FuncionarioPerfilController";

const router = Router();

/// http://localhost:3000/api/funcionarios/1/perfis
router.get("/:id/perfis", FuncionarioPerfilController.listar);
/// http://localhost:3000/api/funcionarios/1/perfis
router.post("/:id/perfis", FuncionarioPerfilController.adicionar);
/// http://localhost:3000/api/funcionarios/1/perfis/3
router.delete("/:id/perfis/:perfilId", FuncionarioPerfilController.remover);

module.exports = router;