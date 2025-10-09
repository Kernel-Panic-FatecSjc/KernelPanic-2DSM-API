import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import type { Funcionario } from "./Funcionario.js";
import type { Cliente } from "./Cliente.js";

import { Funcionario as FuncionarioEntity } from "./Funcionario.js";
import { Cliente as ClienteEntity } from "./Cliente.js";

@Entity("Interacao_cliente")
export class InteracaoCliente {
  @PrimaryGeneratedColumn({ name: "interacao_ID" })
  interacao_ID!: number;

  @Column({ name: "data_interacao", type: "date" })
  data_interacao!: Date;

  @Column({ name: "tipo_interacao", type: "varchar", length: 20 })
  tipo_interacao!: string;

  @Column({ name: "relatorio_interacao", type: "varchar", length: 255 })
  relatorio_interacao!: string;

  // Relação com Funcionario
  @ManyToOne(
    () => FuncionarioEntity,
    (funcionario: Funcionario) => funcionario.interacoes
  )
  @JoinColumn({ name: "funcionario_ID" })
  funcionario!: Funcionario;

  // Relação com Cliente
  @ManyToOne(
    () => ClienteEntity,
    (cliente: Cliente) => cliente.interacoes
  )
  @JoinColumn({ name: "cliente_ID" })
  cliente!: Cliente;
}