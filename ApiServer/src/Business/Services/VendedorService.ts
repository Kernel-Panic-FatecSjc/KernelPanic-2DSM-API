import { Like, Repository } from "typeorm";
import { AppDataSource } from "../../DAL/ormconfig";
import { Funcionario } from "../../DAL/Models/Funcionario";

export class VendedorService {
    private funcionarioRepo: Repository<Funcionario>;

    constructor() {
        this.funcionarioRepo = AppDataSource.getRepository(Funcionario);
    }

    async listarTodos(): Promise<Funcionario[]> {
        return this.funcionarioRepo.find({
            where: { cargo: Like("%Vendedor%") },
            relations: ["vendas", "clientes"], 
            order: { nome: "ASC" },
        });
    }

    async buscarPorID(id: number): Promise<Funcionario | null> {
        return this.funcionarioRepo.findOne({
            where: { funcionario_ID: id, cargo: Like("%Vendedor%") },
            relations: ["vendas", "clientes"],
        });
    }
}
