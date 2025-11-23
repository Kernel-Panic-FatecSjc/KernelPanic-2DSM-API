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

  async getFuncionarios(){
    const funcionarios = await this.funcionarioRepo.find();
    if (!funcionarios) throw new Error("Funcionário não encontrado");
    return funcionarios;

  }

  async atualizarLocalizacao(funcionarioId: number, localizacao: string): Promise<Funcionario> {
    const funcionario = await this.funcionarioRepo.findOneBy({ funcionario_ID: funcionarioId });
    if (!funcionario) throw new Error("Funcionário não encontrado");
    funcionario.localizacao_funcionario = localizacao;
    return this.funcionarioRepo.save(funcionario);
  }

   formatLocalDateTime(date: Date) {
    const pad = (n: number) => String(n).padStart(2, "0");

    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());

    const hour = pad(date.getHours());
    const minute = pad(date.getMinutes());
    const second = pad(date.getSeconds());

    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  }

  async atualizarUltimoLogin(email: string): Promise<Funcionario> {
    const funcionario = await this.funcionarioRepo.findOneBy({ email: email });
    if (!funcionario) throw new Error("Funcionário não encontrado");
    const agora = this.formatLocalDateTime(new Date());
    funcionario.data_ultimo_login = agora
    return this.funcionarioRepo.save(funcionario);
  }

  async getVendedor(): Promise<Funcionario[]> {
    return this.funcionarioRepo.find({
      where: { cargo: ILike("vendedor") },
      relations: ["clientes", "agendamentos", "interacoes", "vendas"],
    });
  }
}
