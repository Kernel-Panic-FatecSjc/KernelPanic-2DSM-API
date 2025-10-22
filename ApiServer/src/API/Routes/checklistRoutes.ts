import express from "express";
import multer from "multer";
import path from "path";
import { ChecklistController } from "../Controllers/checklistController";

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

router.post("/", upload.single("zipFile"), ChecklistController.create);
router.get("/", ChecklistController.getAll);
router.get("/:tipo", ChecklistController.getByTipo);

export default router;