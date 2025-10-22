import { checklistRepository } from "../../DAL/Repository/checklistRepository";

export const ChecklistService = {
  async createChecklist(tipo: string, respostas: any, path_img: string | null) {
    if (!tipo || !respostas) throw new Error("Tipo e respostas são obrigatórios.");

    const data = {
      tipo,
      respostas: JSON.stringify(respostas),
      path_img,
    };

    return await checklistRepository.create(data);
  },

  async getChecklists() {
    return await checklistRepository.findAll();
  },

  async getChecklistsByTipo(tipo: string) {
    return await checklistRepository.findByTipo(tipo);
  },
};