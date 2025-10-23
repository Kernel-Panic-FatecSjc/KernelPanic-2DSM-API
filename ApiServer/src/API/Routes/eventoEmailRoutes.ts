import { Router } from "express";
import { postEvento , getEventos} from "../Controllers/eventoEmailController";

const router = Router();

router.post("/lembrete", postEvento);

router.get("/", getEventos)

module.exports = router;