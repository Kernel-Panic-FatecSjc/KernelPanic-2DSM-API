import { Repository } from "typeorm";
import { AppDataSource } from "../../DAL/ormconfig";
import { Funcionario } from "../../DAL/Models/Funcionario";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

export class AuthService {
  private funcionarioRepo: Repository<Funcionario>;

  constructor() {
    this.funcionarioRepo = AppDataSource.getRepository(Funcionario);
  }

  async login(data: {
    email: string;
    senha: string;
  }): Promise<{ accessToken: string; nome: string }> {
    const { email, senha } = data;

    const funcionario = await this.funcionarioRepo.findOne({
      where: { email: email },
      relations: ["perfis"],
    });

    if (!funcionario) {
      throw new Error("E-mail ou senha inválidos.");
    }

    const isPasswordMatching = await bcrypt.compare(
      senha,
      funcionario.senha_hash
    );

    if (!isPasswordMatching) {
      throw new Error("E-mail ou senha inválidos.");
    }

    const perfisDoUsuario = funcionario.perfis.map((perfil) => perfil.nome);
    const payload = {
      id: funcionario.funcionario_ID,
      email: funcionario.email,
      perfis: perfisDoUsuario,
    };

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("Segredo JWT não foi configurado no arquivo .env");
    }

    const accessToken = jwt.sign(payload, secret, {
      expiresIn: "8h",
    });

    return {
      accessToken,
      nome: funcionario.nome,
    };
  }
}