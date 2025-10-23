import { Repository } from "typeorm";
import { AppDataSource } from "../../DAL/ormconfig";
import { Perfil } from "../../DAL/Models/Perfil";

export class PerfilService {
  private perfilRepo: Repository<Perfil>;

  constructor() {
    this.perfilRepo = AppDataSource.getRepository(Perfil);
  }

  async listarTodos(): Promise<Perfil[]> {
    return this.perfilRepo.find();
  }

  async buscarPorId(id: number): Promise<Perfil | null> {
    return this.perfilRepo.findOneBy({ perfil_ID: id });
  }

  // adicionaria aqui: criarPerfil, editarPerfil, etc.
}