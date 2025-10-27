import { Router } from "express";
import { getVendedor } from "../Controllers/vendedorController";
import { getInteracoes } from "../Controllers/historicoControllers";
const router = Router();

router.get("/getVendedores", getVendedor)

router.get("/", getInteracoes)

module.exports = router;