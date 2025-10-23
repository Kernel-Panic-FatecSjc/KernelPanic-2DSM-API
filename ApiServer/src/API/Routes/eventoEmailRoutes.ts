import { Router } from "express";
import { postLembrete , getLembrete} from "../Controllers/eventoEmailController";

const router = Router();

router.post("/lembrete", postLembrete);

router.get("/", getLembrete)

module.exports = router;