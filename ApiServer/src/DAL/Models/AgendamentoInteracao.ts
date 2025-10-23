import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn, // Define nome da chave estrangeira
} from "typeorm";

// ===== Importações de tipos =====
import type { Cliente } from "./Cliente.js";
import type { Funcionario } from "./Funcionario.js";
import type { InteracaoCliente } from "./InteracaoCliente.js";

// ===== Importações reais para decorators =====
import { Cliente as ClienteEntity } from "./Cliente.js";
import { Funcionario as FuncionarioEntity } from "./Funcionario.js";
import { InteracaoCliente as InteracaoClienteEntity } from "./InteracaoCliente.js";

@Entity("Agendamento_interacao") // ===== Nome explícito da tabela =====
export class AgendamentoInteracao {
  @PrimaryGeneratedColumn({ name: "agendamento_interacao_ID" }) // ===== PK =====
  agendamento_interacao_ID!: number;

  @Column({ name: "data_marcada", type: "datetime" }) // ===== Data agendada =====
  data_marcada!: Date;

  @Column({ name: "tipo_interacao", type: "varchar", length: 20 }) // ===== Tipo da interação =====
  tipo_interacao!: string;

  @Column({ name: "status", type: "varchar", length: 20 }) // ===== Status da interação =====
  status!: string;

  @Column({ name: "notas", type: "varchar", length: 255, nullable: true }) // ===== Notas opcionais =====
  notas?: string;

  // ===== Relação com Cliente =====
  @ManyToOne(() => ClienteEntity, (cliente: Cliente) => cliente.agendamentos)
  @JoinColumn({ name: "cliente_ID" }) // ===== FK para Cliente =====
  cliente!: Cliente;

  // ===== Relação com Funcionário =====
  @ManyToOne(() => FuncionarioEntity, (funcionario: Funcionario) => funcionario.agendamentos)
  @JoinColumn({ name: "funcionario_ID" }) // ===== FK para Funcionário =====
  funcionario!: Funcionario;

  // ===== Relação 1:N com Interações do Cliente =====
  @OneToMany(() => InteracaoClienteEntity, (interacao: InteracaoCliente) => interacao.agendamento)
  interacoes?: InteracaoCliente[];
}