import express from "express";
import { AberturaController } from "../Controllers/aberturaController.js";

const router = express.Router();

router.post("/", AberturaController.create);
router.get("/", AberturaController.getAll);

export default router;