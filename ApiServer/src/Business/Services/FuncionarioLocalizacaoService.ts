import { AppDataSource } from "../../DAL/ormconfig";
import { Funcionario } from "../../DAL/Models/Funcionario";

export class FuncionarioLocalizacaoService {
    private repo = AppDataSource.getRepository(Funcionario);

    async atualizarLocalizacao(funcionarioId: number, localizacao: string) {
        const funcionario = await this.repo.findOne({
      where: { funcionario_ID: funcionarioId }
    });

    if(!funcionario){
        throw new Error("Funcionário não encontrado");
    }

    funcionario.localizacao_funcionario = localizacao;

    return await this.repo.save(funcionario)



     }
}