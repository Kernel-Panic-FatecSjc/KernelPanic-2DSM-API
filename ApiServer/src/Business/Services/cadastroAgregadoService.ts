import { Repository } from "typeorm";
import { AppDataSource } from "../../DAL/ormconfig";
import { ChecklistAgregado } from "../../DAL/Models/cadastroAgregado";

export class ChecklistService {
  private checklistRepo: Repository<ChecklistAgregado>;

  constructor() {
    this.checklistRepo = AppDataSource.getRepository(ChecklistAgregado);
  }

  async createChecklist(tipo: string, respostas: any, path_img: string | null) {
    if (!tipo || !respostas) throw new Error("Tipo e respostas são obrigatórios.");

    const checklist = new ChecklistAgregado();
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
