import { checklistRepository } from "../../DAL/Repository/checklistAgregadoRepository";

export const ChecklistService = {
  async createChecklist(tipo: string, respostas: any, path_img: string | null) {
    if (!tipo || !respostas) throw new Error("Tipo e respostas são obrigatórios.");

    const data = {
      tipo,
      respostas: typeof respostas === 'string' ? respostas : JSON.stringify(respostas),
      path_img,
    };

    return await checklistRepository.create(data);
  },

  async updateChecklistWithZip(id: number, zipPath: string) {
    return await checklistRepository.updateZipPath(id, zipPath);
  },

  async getChecklistById(id: number) {
    return await checklistRepository.findById(id);
  },

  async getChecklists() {
    return await checklistRepository.findAll();
  },

  async getChecklistsByTipo(tipo: string) {
    return await checklistRepository.findByTipo(tipo);
  },
};