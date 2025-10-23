import express from "express";
import multer from "multer";
import path from "path";
import { ChecklistController } from "../Controllers/checklistAgregadoController";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../uploads"));
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + file.originalname.replace(/\s/g, "_");
    cb(null, unique);
  },
});

const upload = multer({ storage });

router.post("/:tipo",
  upload.fields([
    { name: "foto_motor", maxCount: 1 },
    { name: "foto_troca_oleo", maxCount: 1 },
    { name: "fotos_pneus", maxCount: 4 },
    { name: "fotos_gerais", maxCount: 4 },
  ]),
  ChecklistController.create
);
router.get("/", ChecklistController.getAll);
router.get("/:tipo", ChecklistController.getByTipo);

module.exports = router;