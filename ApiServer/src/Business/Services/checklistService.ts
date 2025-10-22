import { ChecklistRepository } from "../../DAL/Repository/checklistRepository";

export const ChecklistService = {
  async createChecklist(tipo: string, respostas: any, path_img?: string) {
    if (!tipo) throw new Error("O campo 'tipo' é obrigatório.");
    if (!respostas) throw new Error("As respostas são obrigatórias.");

    return await ChecklistRepository.create(tipo, respostas, path_img);
  },

  async getChecklists() {
    return await ChecklistRepository.getAll();
  },

  async getChecklistsByTipo(tipo: string) {
    return await ChecklistRepository.getByTipo(tipo);
  },
};
