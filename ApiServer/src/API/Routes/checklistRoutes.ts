import express from "express";

import { checklistController } from "../Controllers/checklistController";

const router = express.Router();


router.post("/", checklistController.create.bind(checklistController));
router.get("/", checklistController.getAll.bind(checklistController));

router.get("/:tipo", checklistController.getByTipo.bind(checklistController));

router.delete("/", checklistController.delete.bind(checklistController))

module.exports = router;
