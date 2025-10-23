import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  Unique,
  JoinColumn, // Para definir nomes das FKs
} from "typeorm";

// ===== Importações de tipos (TS only) =====
import type { Cliente } from "./Cliente.js";
import type { AgendamentoInteracao } from "./AgendamentoInteracao.js";
import type { InteracaoCliente } from "./InteracaoCliente.js";
import type { Vendas } from "./Vendas.js";
import type { EventoTreinamento } from "./EventoTreinamento.js";
import type { FuncionariosConvidados } from "./FuncionariosConvidados.js";
import type { Funcionario as FuncionarioType } from "./Funcionario.js"; // Recursivo

// ===== Importações reais para decorators =====
import { Cliente as ClienteEntity } from "./Cliente.js";
import { AgendamentoInteracao as AgendamentoEntity } from "./AgendamentoInteracao.js";
import { InteracaoCliente as InteracaoEntity } from "./InteracaoCliente.js";
import { Vendas as VendasEntity } from "./Vendas.js";
import { EventoTreinamento as EventoEntity } from "./EventoTreinamento.js";
import { FuncionariosConvidados as ConvidadosEntity } from "./FuncionariosConvidados.js";
import { Funcionario as FuncionarioEntity } from "./Funcionario.js";

@Entity("Funcionario") // ===== Nome da tabela =====
@Unique(["email"]) // ===== Email único =====
export class Funcionario {
  @PrimaryGeneratedColumn({ name: "funcionario_ID" }) // ===== PK =====
  funcionario_ID!: number;

  @Column({ name: "nome", type: "varchar", length: 100 }) // ===== Nome completo =====
  nome!: string;

  @Column({ name: "genero", type: "varchar", length: 10 }) // ===== Gênero =====
  genero!: string;

  @Column({ name: "endereco", type: "varchar", length: 255 }) // ===== Endereço =====
  endereco!: string;

  @Column({ name: "numero_telefone", type: "varchar", length: 20 }) // ===== Telefone =====
  numero_telefone!: string;

  @Column({ name: "cargo", type: "varchar", length: 50 }) // ===== Cargo =====
  cargo!: string;

  @Column({ name: "email", type: "varchar", length: 50 }) // ===== Email =====
  email!: string;

  @Column({ name: "senha_hash", type: "varchar", length: 255 }) // ===== Hash da senha =====
  senha_hash!: string;

  @Column({ name: "nivel_acesso", type: "varchar", length: 255 }) // ===== Nível de acesso =====
  nivel_acesso!: string;

  @Column({ name: "localizacao_funcionario", type: "varchar", length: 100 }) // ===== Localização =====
  localizacao_funcionario!: string;

  // ===== Relação recursiva ManyToOne: gerente =====
  @ManyToOne(() => FuncionarioEntity, (gerente: FuncionarioType) => gerente.subordinados, { nullable: true })
  @JoinColumn({ name: "gerente_ID" }) // ===== FK para gerente =====
  gerente_ID?: FuncionarioType;

  // ===== Relação OneToMany: subordinados =====
  @OneToMany(() => FuncionarioEntity, (funcionario: FuncionarioType) => funcionario.gerente_ID)
  subordinados?: FuncionarioType[];

  // ===== Relação OneToMany: clientes atendidos =====
  @OneToMany(() => ClienteEntity, (cliente: Cliente) => cliente.funcionario)
  clientes?: Cliente[];

  // ===== Relação OneToMany: agendamentos =====
  @OneToMany(() => AgendamentoEntity, (agendamento: AgendamentoInteracao) => agendamento.funcionario)
  agendamentos?: AgendamentoInteracao[];

  // ===== Relação OneToMany: interações =====
  @OneToMany(() => InteracaoEntity, (interacao: InteracaoCliente) => interacao.funcionario)
  interacoes?: InteracaoCliente[];

  // ===== Relação OneToMany: vendas =====
  @OneToMany(() => VendasEntity, (venda: Vendas) => venda.funcionario)
  vendas?: Vendas[];

  // ===== Relação OneToMany: eventos organizados =====
  @OneToMany(() => EventoEntity, (evento: EventoTreinamento) => evento.organizador_ID)
  eventosOrganizados?: EventoTreinamento[];

  // ===== Relação OneToMany: convites para eventos =====
  @OneToMany(() => ConvidadosEntity, (convite: FuncionariosConvidados) => convite.funcionario)
  convites?: FuncionariosConvidados[];
}