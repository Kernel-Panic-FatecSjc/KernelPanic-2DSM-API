import { Repository } from "typeorm";
import { AppDataSource } from "../../DAL/ormconfig";
import { ChecklistFuncionario } from "../../DAL/Models/ChecklistFuncionario";

export class ChecklistService {
    private checklistRepo: Repository<ChecklistFuncionario>;

    constructor() {
        this.checklistRepo = AppDataSource.getRepository(ChecklistFuncionario);
    }

    async createChecklist(
        tipo: string,
        respostas: any,
        path_img: string | null
    ) {
        if (!tipo || !respostas)
            throw new Error("Tipo e respostas são obrigatórios.");

        const checklist = new ChecklistFuncionario();
        checklist.tipo = tipo;
        checklist.respostas = respostas;

        if (path_img !== null) {
            checklist.pathImg = path_img;
        }

        return await this.checklistRepo.save(checklist);
    }

    async updateChecklist(
      checkFuncID: number,
      tipo?: string,
      respostas?: any,
      path_img?: string | null
    ) {
      const checklist = await this.checklistRepo.findOneBy({ checkFuncID });
      if (!checklist) {
        throw new Error("Checklist não encontrado.");
      }

      // Atualiza apenas os campos enviados
      if (tipo !== undefined) checklist.tipo = tipo;
      if (respostas !== undefined) checklist.respostas = respostas;
      if (path_img !== undefined) checklist.pathImg = path_img ?? "";

      return await this.checklistRepo.save(checklist);
    }


    async getChecklists() {
        return await this.checklistRepo.find({
            order: { checkFuncID: "DESC" },
        });
    }

    async getChecklistsByTipo(tipo: string) {
        return await this.checklistRepo.find({
            where: { tipo },
            order: { checkFuncID: "DESC" },
        });
    }

    async deleteChecklist(checkFuncID: number): Promise<boolean> {
        const checklist = await this.checklistRepo.findOneBy({ checkFuncID });

        if (!checklist) {
            return false;
        }

        await this.checklistRepo.remove(checklist);
        return true;
    }
}