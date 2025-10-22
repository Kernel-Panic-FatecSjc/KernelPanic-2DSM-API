import { Router } from "express";
import { ChecklistController } from "../Controllers/checklistController";

const router = Router();

router.post("/", ChecklistController.create);
router.get("/", ChecklistController.getAll);
router.get("/:tipo", ChecklistController.getByTipo);

export default router;