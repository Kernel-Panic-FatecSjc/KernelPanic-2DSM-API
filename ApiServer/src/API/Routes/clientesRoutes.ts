// Em ./API/Routes/clientesRoutes.ts

import express from "express";
import { 
    atribuirContato, 
    criarCliente, 
    getClientes, 
    updateCliente,
    deleteCliente 
} from "../Controllers/clienteController";

const router = express.Router();

router.get("/", getClientes);

router.post("/", criarCliente);

router.put("/:id", updateCliente);

router.delete("/:id", deleteCliente);

router.post("/contato", atribuirContato);

module.exports = router;