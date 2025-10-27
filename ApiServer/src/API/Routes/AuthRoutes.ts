import express, { Request, Response } from "express";
import { AuthController } from "../Controllers/AuthController";
const router = express.Router();
const authController = new AuthController();

router.post("/", (req: Request, res: Response) => {
  return authController.login(req, res);
});

module.exports = router;