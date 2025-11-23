import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn, // Importa o JoinColumn para definir chaves estrangeiras
} from "typeorm";

// Importação apenas para tipos (não gera código JS)
import type { FuncionariosConvidados } from "./FuncionariosConvidados.js";

// Importação real para uso no decorator do TypeORM
import { FuncionariosConvidados as FuncionariosConvidadosEntity } from "./FuncionariosConvidados.js";

@Entity("Presenca") // Define o nome da tabela no banco de dados
export class Presenca {
  // Chave primária auto gerada para identificar cada registro de presença
  @PrimaryGeneratedColumn({ name: "presenca_ID" })
  presenca_ID!: number;

  // Indica se o funcionário esteve presente (true) ou ausente (false)
  @Column({ name: "presente", type: "boolean" })
  presente!: boolean;

  // Caso ausente, motivo da recusa/ausência (opcional)
  @Column({ name: "razao_recusa", type: "longtext", nullable: true })
  razao_recusa?: string;

  // Data e hora em que o evento foi finalizado para esse convidado (opcional)
  @Column({ name: "data_termino", type: "timestamp", nullable: true })
  data_termino?: Date;

  // Link para feedback relacionado ao evento (opcional)
  @Column({ name: "link_feedback", type: "longtext", nullable: true })
  link_feedback?: string;

  @Column({ name: "funcionario_ID", type: "int" })
  funcionario_ID!: number;

  @Column({ name: "evento_ID", type: "int" })
  evento_ID!: number;
  
  // Relacionamento muitos-para-um com FuncionariosConvidados (convidado de um evento)
  // Associação feita pela chave composta funcionario_ID + evento_ID
  @ManyToOne(
    () => FuncionariosConvidadosEntity,
    (fc: FuncionariosConvidados) => fc.presencas
  )
  @JoinColumn([
    { name: "funcionario_ID", referencedColumnName: "funcionario_ID" },
    { name: "evento_ID", referencedColumnName: "evento_ID" },
  ])
  funcionarioConvidado!: FuncionariosConvidados;
}