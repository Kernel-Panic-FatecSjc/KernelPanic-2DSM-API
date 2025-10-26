import { Repository } from "typeorm";
import { AppDataSource } from "../../DAL/ormconfig";
import { ChecklistAgregado } from "../../DAL/Models/ChecklistAgregado";

export class ChecklistAgregadoService {
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

  async updateChecklistWithZip(id: number, zipPath: string) {
    const checklist = await this.checklistRepo.findOne({
      where: { checkAgreID: id }
    });

    if (!checklist) {
      throw new Error(`Checklist com ID ${id} não encontrado.`);
    }

    checklist.pathImg = zipPath;
    return await this.checklistRepo.save(checklist);
  }

  async getChecklistById(id: number) {
    return await this.checklistRepo.findOne({
      where: { checkAgreID: id }
    });
  }

  async getChecklists() {
    return await this.checklistRepo.find({
      order: { checkAgreID: "DESC" }
    });
  }

  async getChecklistsByTipo(tipo: string) {
    return await this.checklistRepo.find({
      where: { tipo },
      order: { checkAgreID: "DESC" }
    });
  }
}