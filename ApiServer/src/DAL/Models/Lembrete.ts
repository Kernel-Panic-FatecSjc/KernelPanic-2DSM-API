import { Entity, PrimaryGeneratedColumn, Column, Check } from "typeorm";

@Entity("Lembrete") // ===== Nome da tabela =====
@Check(`"categoria" IN ('categoria1', 'categoria2', 'categoria3', 'categoria4')`) // ===== Restrição de valores para categoria =====
export class Lembrete {
  @PrimaryGeneratedColumn({ name: "lembrete_ID" }) // ===== Chave primária =====
  lembrete_ID!: number;

  @Column({ name: "email", type: "varchar", length: 255 }) // ===== Email associado ao evento =====
  email!: string;

  @Column({ name: "titulo", type: "varchar", length: 255 }) // ===== Título do evento =====
  titulo!: string;

  @Column({ name: "dataHora", type: "datetime" }) // ===== Data e hora do evento =====
  dataHora!: Date;

  @Column({ name: "categoria", type: "varchar", length: 30 }) // ===== Categoria do evento (restrita via Check) =====
  categoria!: string;
}