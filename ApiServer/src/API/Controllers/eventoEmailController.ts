import { Request, Response } from "express";
import { criarEvento, listarEventos } from "../../Business/Services/eventoEmailService";

export async function postEvento(req: Request, res: Response) {
  // ===== Extrai dados do corpo da requisição =====
  const { email, titulo, dataHora, categoria } = req.body;

  // ===== Validação básica dos campos obrigatórios =====
  if (!email || !titulo || !dataHora || !categoria) {
    return res.status(400).json({ erro: "Preencha todos os campos" });
  }

  try {
    // ===== Cria o evento chamando o serviço =====
    const evento = await criarEvento(email, titulo, new Date(dataHora), categoria);

    // ===== Retorna sucesso com o ID do evento criado =====
    return res.json({ sucesso: true, id: evento.id });
  } catch (err) {
    // ===== Log do erro e retorno de erro interno =====
    console.error(err);
    return res.status(500).json({ erro: "Erro ao salvar evento!" });
  }
}

export async function getEventos(req: Request, res: Response){
  try{
    const evento = await listarEventos()
    return res.json({ sucesso: true, evento: evento})
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ erro: "Erro ao salvar evento!" });
  }
}