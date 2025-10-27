import { Repository, ILike } from "typeorm";
import { AppDataSource } from "../../DAL/ormconfig";
import { Funcionario } from "../../DAL/Models/Funcionario";

export class FuncionarioService {
  private funcionarioRepo: Repository<Funcionario>;

  constructor() {
    this.funcionarioRepo = AppDataSource.getRepository(Funcionario);
  }

  async getById(funcionarioId: number): Promise<Funcionario> {
    const funcionario = await this.funcionarioRepo.findOne({
      where: { funcionario_ID: funcionarioId },
      relations: ["perfis", "clientes", "interacoes", "vendas", "subordinados"],
    });
    if (!funcionario) throw new Error("Funcionário não encontrado");
    return funcionario;
  }

  async atualizarLocalizacao(funcionarioId: number, localizacao: string): Promise<Funcionario> {
    const funcionario = await this.funcionarioRepo.findOneBy({ funcionario_ID: funcionarioId });
    if (!funcionario) throw new Error("Funcionário não encontrado");
    funcionario.localizacao_funcionario = localizacao;
    return this.funcionarioRepo.save(funcionario);
  }

  async getVendedor(): Promise<Funcionario[]> {
    return this.funcionarioRepo.find({
      where: { cargo: ILike("vendedor") },
      relations: ["clientes", "agendamentos", "interacoes", "vendas"],
    });
  }
}
