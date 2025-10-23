import express from "express";
import multer from "multer";
import path from "path";
import { checklistController } from "../Controllers/checklistController";

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

router.post("/", checklistController.create.bind(checklistController));
router.get("/", checklistController.getAll.bind(checklistController));
router.get("/:tipo", checklistController.getByTipo.bind(checklistController));

module.exports = router;