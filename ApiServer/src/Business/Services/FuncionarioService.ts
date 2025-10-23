import { Repository } from "typeorm";
import { AppDataSource } from "../../DAL/ormconfig";
import { Funcionario } from "../../DAL/Models/Funcionario";
import { ILike } from "typeorm";

export class FuncionarioService {
    private vendedorRepo: Repository<Funcionario>;
    

    constructor() {
        this.vendedorRepo = AppDataSource.getRepository(Funcionario);
    }

    async getVendedor(): Promise<Funcionario[]> {
        return this.vendedorRepo.find({
            where: {
                cargo: ILike("vendedor"),
            },
            relations: ["clientes", "agendamentos", "interacoes", "vendas"],
        });
    }
}
