import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
} from "typeorm";
import type { Funcionario } from "./Funcionario.js";
import { Funcionario as FuncionarioEntity } from "./Funcionario.js";

@Entity("Perfil")
export class Perfil {
  @PrimaryGeneratedColumn({ name: "perfil_ID" })
  perfil_ID!: number;

  @Column({ name: "nome", type: "varchar", length: 50, unique: true })
  nome!: string; // Ex: 'GESTOR', 'VENDEDOR', 'ADMINISTRADOR'

  @Column({ name: "descricao", type: "varchar", length: 255, nullable: true })
  descricao?: string; // Ex: "Pode visualizar relatórios e gerenciar equipes."

  @ManyToMany(() => FuncionarioEntity, (funcionario: Funcionario) => funcionario.perfis)
  funcionarios?: Funcionario[];
}