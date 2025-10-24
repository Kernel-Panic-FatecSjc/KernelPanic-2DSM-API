import express from "express";
import { atribuirContato, criarCliente, getClientes } from "../Controllers/clienteController";
const router = express.Router()

router.post("/",criarCliente)

router.post("/contato",atribuirContato)

router.get("/getClientes", getClientes)

module.exports = router;