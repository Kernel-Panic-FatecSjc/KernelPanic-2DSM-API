import { Request, Response } from "express";
import { ChecklistAgregadoService } from "../../Business/Services/checklistAgregadoService";
import { ZipService } from "../../Business/Services/zipService";

interface MulterFiles {
  [fieldname: string]: Express.Multer.File[];
}

interface MulterRequest extends Request {
  files?: MulterFiles;
}

export class ChecklistAgregadoController {
  private checklistService: ChecklistAgregadoService;

  constructor() {
    this.checklistService = new ChecklistAgregadoService();
    // ZipService é um objeto, não precisa ser instanciado
  }

  async create(req: Request, res: Response) {
    try {
      const multerReq = req as MulterRequest;
      const files = multerReq.files;
      
      // ✅ CORREÇÃO: Pegar o tipo do body em vez do params
      const { tipo, respostas } = req.body;

      console.log("📥 Dados recebidos:");
      console.log("Tipo:", tipo);
      console.log("Respostas:", respostas);

      if (!tipo || !respostas) {
        return res.status(400).json({ error: "Tipo e respostas são obrigatórios." });
      }

      if (!files || Object.keys(files).length === 0) {
        return res.status(400).json({ error: "Nenhum arquivo foi enviado." });
      }

      // Parse das respostas se for string
      let respostasParsed = respostas;
      if (typeof respostas === 'string') {
        try {
          respostasParsed = JSON.parse(respostas);
        } catch (error) {
          return res.status(400).json({ 
            error: "Formato das respostas é inválido." 
          });
        }
      }

      // Primeiro, criar o registro no banco para obter o ID
      const checklistData = await this.checklistService.createChecklist(tipo, respostasParsed, null);
      
      // Gerar ZIP com as imagens - usando o objeto ZipService diretamente
      const zipFilePath = await ZipService.createChecklistZip(files, checklistData.checkAgreID);

      // Atualizar o registro com o caminho do ZIP
      const updatedChecklist = await this.checklistService.updateChecklistWithZip(
        checklistData.checkAgreID, 
        zipFilePath
      );

      // Limpar arquivos individuais - usando o objeto ZipService diretamente
      await ZipService.cleanupIndividualFiles(files);

      console.log("✅ ZIP criado com sucesso:", zipFilePath);

      return res.status(201).json({
        message: "Checklist salvo com sucesso!",
        result: updatedChecklist,
        zipPath: zipFilePath
      });

    } catch (error: any) {
      console.error("❌ Erro ao criar checklist:", error);
      return res.status(400).json({ error: error.message });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const result = await this.checklistService.getChecklists();
      return res.status(200).json(result);
    } catch (error: any) {
      console.error("Erro ao buscar checklists:", error);
      return res.status(500).json({ error: error.message });
    }
  }

  async getByTipo(req: Request, res: Response) {
    try {
      const { tipo } = req.params;
      if (!tipo) {
        return res.status(400).json({ error: "O parâmetro 'tipo' é obrigatório." });
      }
      const result = await this.checklistService.getChecklistsByTipo(tipo);
      return res.status(200).json(result);
    } catch (error: any) {
      console.error("Erro ao buscar checklist por tipo:", error);
      return res.status(500).json({ error: error.message });
    }
  }

  async downloadZip(req: Request, res: Response): Promise<Response | void> {
    try {
      const { id } = req.params;
      
      if (!id) {
        return res.status(400).json({ error: "ID é obrigatório" });
      }

      const checklistId = parseInt(id);
      if (isNaN(checklistId)) {
        return res.status(400).json({ error: "ID inválido" });
      }

      const checklist = await this.checklistService.getChecklistById(checklistId);
      
      if (!checklist) {
        return res.status(404).json({ error: "Checklist não encontrado" });
      }

      if (!checklist.pathImg) {
        return res.status(404).json({ error: "ZIP não encontrado para este checklist" });
      }

      // Garantir que pathImg é uma string
      const zipPath = checklist.pathImg;
      
      // Verificar se o arquivo existe
      const fs = require('fs');
      if (!fs.existsSync(zipPath)) {
        return res.status(404).json({ error: "Arquivo ZIP não existe no servidor" });
      }

      // Definir headers para download
      res.setHeader('Content-Type', 'application/zip');
      res.setHeader('Content-Disposition', `attachment; filename="checklist_${id}.zip"`);
      
      // Fazer o download
      return res.download(zipPath, `checklist_${id}.zip`, (err) => {
        if (err) {
          console.error('Erro durante o download:', err);
          if (!res.headersSent) {
            res.status(500).json({ error: "Erro durante o download" });
          }
        }
      });

    } catch (error: any) {
      console.error("Erro ao baixar ZIP:", error);
      return res.status(500).json({ error: error.message });
    }
  }
}

// Para compatibilidade com código existente
export const checklistAgregadoController = new ChecklistAgregadoController();