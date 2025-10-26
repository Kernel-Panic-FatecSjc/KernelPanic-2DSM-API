import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("ChecklistAgregado")
export class ChecklistAgregado {
  @PrimaryGeneratedColumn({ name: "check_agre_ID", type: "int" })
  checkFuncID!: number;

  @Column({ name: "tipo", type: "varchar", length: 30 })
  tipo!: string;

  @Column({ name: "respostas", type: "json" })
  respostas!: object;

  @Column({ name: "path_img", type: "varchar", length: 255, nullable: true })
  pathImg?: string;
}