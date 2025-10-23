import express from "express";
import multer from "multer";
import path from "path";
import { ChecklistAgregadoController } from "../Controllers/checklistAgregadoController";

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

// Criar instância do controller
const checklistAgregadoController = new ChecklistAgregadoController();

router.post("/",
  upload.fields([
    { name: "foto_motor", maxCount: 1 },
    { name: "foto_troca_oleo", maxCount: 1 },
    { name: "fotos_pneus", maxCount: 4 },
    { name: "fotos_gerais", maxCount: 4 },
  ]),
  checklistAgregadoController.create.bind(checklistAgregadoController)
);

router.get("/", checklistAgregadoController.getAll.bind(checklistAgregadoController));
router.get("/:tipo", checklistAgregadoController.getByTipo.bind(checklistAgregadoController));
router.get("/download/:id", checklistAgregadoController.downloadZip.bind(checklistAgregadoController));

module.exports = router;