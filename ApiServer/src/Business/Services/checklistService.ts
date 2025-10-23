import { Repository } from "typeorm";
import { AppDataSource } from "../../DAL/ormconfig";
import { ChecklistFuncionario } from "../../DAL/Models/ChecklistFuncionario";

export class ChecklistService {
  private checklistRepo: Repository<ChecklistFuncionario>;

  constructor() {
    this.checklistRepo = AppDataSource.getRepository(ChecklistFuncionario);
  }

  async createChecklist(tipo: string, respostas: any, path_img: string | null) {
    if (!tipo || !respostas) throw new Error("Tipo e respostas são obrigatórios.");

    const checklist = new ChecklistFuncionario();
    checklist.tipo = tipo;
    checklist.respostas = respostas;
    
    if (path_img !== null) {
      checklist.pathImg = path_img;
    }

    return await this.checklistRepo.save(checklist);
  }

  async getChecklists() {
    return await this.checklistRepo.find({
      order: { checkFuncID: "DESC" }
    });
  }

  async getChecklistsByTipo(tipo: string) {
    return await this.checklistRepo.find({
      where: { tipo },
      order: { checkFuncID: "DESC" }
    });
  }
}