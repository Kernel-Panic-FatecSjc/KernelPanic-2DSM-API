import express, { Request, Response } from "express";
import { AuthController } from "../Controllers/AuthController";

const router = express.Router();
const authController = new AuthController();

// ===== Rota POST para realizar o login =====
router.post("/login", (req: Request, res: Response) => {
  return authController.login(req, res);
});

module.exports = router;