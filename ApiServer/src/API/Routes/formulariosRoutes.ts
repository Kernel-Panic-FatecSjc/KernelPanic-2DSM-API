import express from "express";
import { getRespostaByID, getRespostas, putRespostaByID, deleteRespostaByID } from "../Controllers/formulariosControllers";

const router = express.Router();

router.get("/verRespostas", getRespostas)

router.get("/verRespostas:id", getRespostaByID)

router.put("/putRespostas", putRespostaByID)

router.delete("/putRespostas", deleteRespostaByID)

module.exports = router;
