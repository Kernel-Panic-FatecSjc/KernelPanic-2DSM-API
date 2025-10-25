import { Router } from "express";
import { EmailCadastroController } from "../Controllers/emailAgregadoController";

const router = Router();
const emailController = new EmailCadastroController();

// Rota para enviar email de cadastro
router.post("/enviar-email-cadastro", (req, res) => {
  emailController.enviarEmailCadastro(req, res);
});

module.exports = router;