import { Request, Response } from "express";
import { criarLembrete, listarLembretes } from "../../Business/Services/eventoEmailService";

export async function postLembrete(req: Request, res: Response) {
  const { email, titulo, dataHora, categoria } = req.body;

  if (!email || !titulo || !dataHora || !categoria) {
    return res.status(400).json({ erro: "Preencha todos os campos" });
  }

  try {
    const evento = await criarLembrete(email, titulo, new Date(dataHora), categoria);

    return res.json({ sucesso: true, id: evento.lembrete_ID });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: "Erro ao salvar evento!" });
  }
}

export async function getLembrete(req: Request, res: Response){
  try{
    const evento = await listarLembretes()
    return res.json({ sucesso: true, evento: evento})
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ erro: "Erro ao salvar evento!" });
  }
}