import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";

import type { Funcionario } from "./Funcionario.js";
import type { FunilVendas } from "./FunilVendas.js";
import type { ContatoCliente } from "./ContatoCliente.js";
import type { HistoricoFunil } from "./HistoricoFunil.js";
import type { AgendamentoInteracao } from "./AgendamentoInteracao.js";
import type { InteracaoCliente } from "./InteracaoCliente.js";
import type { Vendas } from "./Vendas.js";

import { Funcionario as FuncionarioEntity } from "./Funcionario.js";
import { FunilVendas as FunilVendasEntity } from "./FunilVendas.js";
import { ContatoCliente as ContatoClienteEntity } from "./ContatoCliente.js";
import { HistoricoFunil as HistoricoFunilEntity } from "./HistoricoFunil.js";
import { AgendamentoInteracao as AgendamentoInteracaoEntity } from "./AgendamentoInteracao.js";
import { InteracaoCliente as InteracaoClienteEntity } from "./InteracaoCliente.js";
import { Vendas as VendasEntity } from "./Vendas.js";

@Entity("Cliente") 
export class Cliente {
  @PrimaryGeneratedColumn({ name: "cliente_ID" }) 
  cliente_ID!: number;

  @Column({ name: "nome", type: "varchar", length: 100 }) 
  nome!: string;

  @Column({ name: "endereco", type: "varchar", length: 255 }) 
  endereco!: string;

  @Column({ name: "segmento_atuacao", type: "varchar", length: 40 })
  segmentoAtuacao!: string;

 
  @ManyToOne(() => FuncionarioEntity, (funcionario: Funcionario) => funcionario.clientes)
  @JoinColumn({ name: "funcionario_ID" })
  funcionario!: Funcionario;

  @ManyToOne(() => FunilVendasEntity, (funil: FunilVendas) => funil.clientes)
  @JoinColumn({ name: "funil_ID" }) 
  funil!: FunilVendas;

  @OneToMany(() => ContatoClienteEntity, (contato: ContatoCliente) => contato.cliente)
  contatos?: ContatoCliente[];

  @OneToMany(() => HistoricoFunilEntity, (historico: HistoricoFunil) => historico.cliente)
  historico?: HistoricoFunil[];

  @OneToMany(() => AgendamentoInteracaoEntity, (agendamento: AgendamentoInteracao) => agendamento.cliente)
  agendamentos?: AgendamentoInteracao[];

  @OneToMany(() => InteracaoClienteEntity, (interacao: InteracaoCliente) => interacao.cliente)
  interacoes?: InteracaoCliente[];

  @OneToMany(() => VendasEntity, (venda: Vendas) => venda.cliente)
  vendas?: Vendas[];
}