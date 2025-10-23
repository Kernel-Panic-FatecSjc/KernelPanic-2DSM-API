import { In } from "typeorm";
import { AppDataSource } from "../../DAL/ormconfig";
import { Funcionario } from "../../DAL/Models/Funcionario";
import { Perfil } from "../../DAL/Models/Perfil";

export class FuncionarioPerfilService {
  private funcionarioRepo = AppDataSource.getRepository(Funcionario);
  private perfilRepo = AppDataSource.getRepository(Perfil);

  async listarPerfis(funcionarioId: number) {
    const funcionario = await this.funcionarioRepo.findOne({
      where: { funcionario_ID: funcionarioId },
      relations: ["perfis"],
    });
    if (!funcionario) throw new Error("Funcionário não encontrado");
    return funcionario.perfis || [];
  }

  async adicionarPerfis(funcionarioId: number, perfilIds: number[]) {
    if (!Array.isArray(perfilIds)) throw new Error("O campo 'perfis' deve ser um array de IDs");
    const funcionario = await this.funcionarioRepo.findOne({
      where: { funcionario_ID: funcionarioId },
      relations: ["perfis"],
    });
    if (!funcionario) throw new Error("Funcionário não encontrado");
    const perfis = await this.perfilRepo.findBy({ perfil_ID: In(perfilIds) });
    if (!perfis.length) throw new Error("Nenhum perfil válido encontrado");
    const idsExistentes = funcionario.perfis?.map(p => p.perfil_ID) || [];
    const novosPerfis = perfis.filter(p => !idsExistentes.includes(p.perfil_ID));
    funcionario.perfis = [...(funcionario.perfis || []), ...novosPerfis];
    return this.funcionarioRepo.save(funcionario);
  }

  async removerPerfil(funcionarioId: number, perfilId: number) {
    const funcionario = await this.funcionarioRepo.findOne({
      where: { funcionario_ID: funcionarioId },
      relations: ["perfis"],
    });
    if (!funcionario) throw new Error("Funcionário não encontrado");
    funcionario.perfis = (funcionario.perfis || []).filter(p => p.perfil_ID !== perfilId);
    await this.funcionarioRepo.save(funcionario);
    return { mensagem: "Perfil removido com sucesso" };
  }
}