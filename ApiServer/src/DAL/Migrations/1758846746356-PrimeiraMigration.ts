import { MigrationInterface, QueryRunner } from "typeorm";

export class PrimeiraMigration1758846746356 implements MigrationInterface {
    name = 'PrimeiraMigration1758846746356'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Interacao_cliente\` (\`interacao_ID\` int NOT NULL AUTO_INCREMENT, \`data_interacao\` date NOT NULL, \`tipo_interacao\` varchar(20) NOT NULL, \`relatorio_interacao\` varchar(255) NOT NULL, \`funcionario_ID\` int NULL, \`cliente_ID\` int NULL, \`agendamento_interacao_ID\` int NULL, PRIMARY KEY (\`interacao_ID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Agendamento_interacao\` (\`agendamento_interacao_ID\` int NOT NULL AUTO_INCREMENT, \`data_marcada\` datetime NOT NULL, \`tipo_interacao\` varchar(20) NOT NULL, \`status\` varchar(20) NOT NULL, \`notas\` varchar(255) NULL, \`cliente_ID\` int NULL, \`funcionario_ID\` int NULL, PRIMARY KEY (\`agendamento_interacao_ID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Vendas\` (\`venda_ID\` int NOT NULL AUTO_INCREMENT, \`data_venda\` timestamp NOT NULL, \`valor_total\` decimal(10,2) NOT NULL, \`status\` varchar(20) NOT NULL, \`cliente_ID\` int NULL, \`funcionario_ID\` int NULL, PRIMARY KEY (\`venda_ID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Notificacao\` (\`notificacao_ID\` int NOT NULL AUTO_INCREMENT, \`titulo_notificacao\` varchar(100) NOT NULL, \`corpo_notificacao\` longtext NULL, \`evento_ID\` int NULL, PRIMARY KEY (\`notificacao_ID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Notificacao_convidados\` (\`funcionario_ID\` int NOT NULL, \`evento_ID\` int NOT NULL, \`notificacao_ID\` int NOT NULL, \`status_leitura\` tinyint NOT NULL, \`data_leitura\` timestamp NULL, \`prioridade\` varchar(20) NOT NULL, PRIMARY KEY (\`funcionario_ID\`, \`evento_ID\`, \`notificacao_ID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Presenca\` (\`presenca_ID\` int NOT NULL AUTO_INCREMENT, \`presente\` tinyint NOT NULL, \`razao_recusa\` longtext NULL, \`data_termino\` timestamp NULL, \`link_feedback\` longtext NULL, \`funcionario_ID\` int NULL, \`evento_ID\` int NULL, PRIMARY KEY (\`presenca_ID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Funcionarios_convidados\` (\`funcionario_id\` int NOT NULL, \`evento_id\` int NOT NULL, PRIMARY KEY (\`funcionario_id\`, \`evento_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Evento_treinamento\` (\`evento_ID\` int NOT NULL AUTO_INCREMENT, \`titulo\` varchar(100) NOT NULL, \`descricao\` longtext NULL, \`dataHora\` datetime NOT NULL, \`duracao_horas\` float NOT NULL, \`evento_link\` longtext NULL, \`status\` varchar(20) NOT NULL, \`organizador_ID\` int NULL, PRIMARY KEY (\`evento_ID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Funcionario\` (\`funcionario_ID\` int NOT NULL AUTO_INCREMENT, \`nome\` varchar(100) NOT NULL, \`genero\` varchar(10) NOT NULL, \`endereco\` varchar(255) NOT NULL, \`numero_telefone\` varchar(20) NOT NULL, \`cargo\` varchar(50) NOT NULL, \`email\` varchar(50) NOT NULL, \`senha_hash\` varchar(255) NOT NULL, \`nivel_acesso\` varchar(255) NOT NULL, \`localizacao_funcionario\` varchar(100) NOT NULL, \`gerente_ID\` int NULL, UNIQUE INDEX \`IDX_0e2ca5f6f89d0a834ee47c195f\` (\`email\`), PRIMARY KEY (\`funcionario_ID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Historico_funil\` (\`historico_ID\` int NOT NULL AUTO_INCREMENT, \`data_movimentacao\` timestamp NOT NULL, \`cliente_ID\` int NULL, \`funil_ID\` int NULL, PRIMARY KEY (\`historico_ID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Funil_vendas\` (\`funil_ID\` int NOT NULL AUTO_INCREMENT, \`estagio_nome\` varchar(20) NOT NULL, PRIMARY KEY (\`funil_ID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Contato_cliente\` (\`contato_cliente_ID\` int NOT NULL AUTO_INCREMENT, \`tipo_contato\` varchar(20) NOT NULL, \`valor_contato\` varchar(255) NOT NULL, \`cliente_ID\` int NULL, PRIMARY KEY (\`contato_cliente_ID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Cliente\` (\`cliente_ID\` int NOT NULL AUTO_INCREMENT, \`nome\` varchar(100) NOT NULL, \`endereco\` varchar(255) NOT NULL, \`segmento_atuacao\` varchar(40) NOT NULL, \`funcionario_ID\` int NULL, \`funil_ID\` int NULL, PRIMARY KEY (\`cliente_ID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`eventos\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`titulo\` varchar(255) NOT NULL, \`dataHora\` datetime NOT NULL, \`categoria\` varchar(30) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`Interacao_cliente\` ADD CONSTRAINT \`FK_cb34e5d245ba3c99e3a541d7ef9\` FOREIGN KEY (\`funcionario_ID\`) REFERENCES \`Funcionario\`(\`funcionario_ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Interacao_cliente\` ADD CONSTRAINT \`FK_67a8108793b88002a2bd16ac853\` FOREIGN KEY (\`cliente_ID\`) REFERENCES \`Cliente\`(\`cliente_ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Interacao_cliente\` ADD CONSTRAINT \`FK_7e08f88cf18db9ae3d76baf1bb1\` FOREIGN KEY (\`agendamento_interacao_ID\`) REFERENCES \`Agendamento_interacao\`(\`agendamento_interacao_ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Agendamento_interacao\` ADD CONSTRAINT \`FK_4724e48aa6e4090f9fb842f13b8\` FOREIGN KEY (\`cliente_ID\`) REFERENCES \`Cliente\`(\`cliente_ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Agendamento_interacao\` ADD CONSTRAINT \`FK_5efdc335b48e64f382d8deb2d84\` FOREIGN KEY (\`funcionario_ID\`) REFERENCES \`Funcionario\`(\`funcionario_ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Vendas\` ADD CONSTRAINT \`FK_acdcb804cd337af00d52ff4b4bd\` FOREIGN KEY (\`cliente_ID\`) REFERENCES \`Cliente\`(\`cliente_ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Vendas\` ADD CONSTRAINT \`FK_c3a06704616da020d157ed7ce8d\` FOREIGN KEY (\`funcionario_ID\`) REFERENCES \`Funcionario\`(\`funcionario_ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Notificacao\` ADD CONSTRAINT \`FK_13bf01535d8fd63e3838b6b238d\` FOREIGN KEY (\`evento_ID\`) REFERENCES \`Evento_treinamento\`(\`evento_ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Notificacao_convidados\` ADD CONSTRAINT \`FK_bf5c5fca40a401d990ae8a2a3e8\` FOREIGN KEY (\`notificacao_ID\`) REFERENCES \`Notificacao\`(\`notificacao_ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Notificacao_convidados\` ADD CONSTRAINT \`FK_2db1f5eae0532a74fe60d60dae8\` FOREIGN KEY (\`funcionario_ID\`, \`evento_ID\`) REFERENCES \`Funcionarios_convidados\`(\`funcionario_id\`,\`evento_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Presenca\` ADD CONSTRAINT \`FK_2769263adcec6e12e8a8950376b\` FOREIGN KEY (\`funcionario_ID\`, \`evento_ID\`) REFERENCES \`Funcionarios_convidados\`(\`funcionario_id\`,\`evento_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Funcionarios_convidados\` ADD CONSTRAINT \`FK_50bb6dbfc38b7c408dc0ebd1973\` FOREIGN KEY (\`evento_id\`) REFERENCES \`Evento_treinamento\`(\`evento_ID\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Funcionarios_convidados\` ADD CONSTRAINT \`FK_66f1d2b0d133bb6ddda6739a9fb\` FOREIGN KEY (\`funcionario_id\`) REFERENCES \`Funcionario\`(\`funcionario_ID\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Evento_treinamento\` ADD CONSTRAINT \`FK_7cfb9f5abe404e7c976eef9776f\` FOREIGN KEY (\`organizador_ID\`) REFERENCES \`Funcionario\`(\`funcionario_ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Funcionario\` ADD CONSTRAINT \`FK_b13934bb9abdb7b2f4faef99ced\` FOREIGN KEY (\`gerente_ID\`) REFERENCES \`Funcionario\`(\`funcionario_ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Historico_funil\` ADD CONSTRAINT \`FK_c3ff30955f7a883c410d1755583\` FOREIGN KEY (\`cliente_ID\`) REFERENCES \`Cliente\`(\`cliente_ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Historico_funil\` ADD CONSTRAINT \`FK_333d628457f18f33a1735cba62b\` FOREIGN KEY (\`funil_ID\`) REFERENCES \`Funil_vendas\`(\`funil_ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Contato_cliente\` ADD CONSTRAINT \`FK_50cb9aaeca047b8fe653c9fad02\` FOREIGN KEY (\`cliente_ID\`) REFERENCES \`Cliente\`(\`cliente_ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Cliente\` ADD CONSTRAINT \`FK_70e132bf1f92bb6d009bb3bb810\` FOREIGN KEY (\`funcionario_ID\`) REFERENCES \`Funcionario\`(\`funcionario_ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Cliente\` ADD CONSTRAINT \`FK_b5873b13256f9258b1e3f8a8cc6\` FOREIGN KEY (\`funil_ID\`) REFERENCES \`Funil_vendas\`(\`funil_ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Cliente\` DROP FOREIGN KEY \`FK_b5873b13256f9258b1e3f8a8cc6\``);
        await queryRunner.query(`ALTER TABLE \`Cliente\` DROP FOREIGN KEY \`FK_70e132bf1f92bb6d009bb3bb810\``);
        await queryRunner.query(`ALTER TABLE \`Contato_cliente\` DROP FOREIGN KEY \`FK_50cb9aaeca047b8fe653c9fad02\``);
        await queryRunner.query(`ALTER TABLE \`Historico_funil\` DROP FOREIGN KEY \`FK_333d628457f18f33a1735cba62b\``);
        await queryRunner.query(`ALTER TABLE \`Historico_funil\` DROP FOREIGN KEY \`FK_c3ff30955f7a883c410d1755583\``);
        await queryRunner.query(`ALTER TABLE \`Funcionario\` DROP FOREIGN KEY \`FK_b13934bb9abdb7b2f4faef99ced\``);
        await queryRunner.query(`ALTER TABLE \`Evento_treinamento\` DROP FOREIGN KEY \`FK_7cfb9f5abe404e7c976eef9776f\``);
        await queryRunner.query(`ALTER TABLE \`Funcionarios_convidados\` DROP FOREIGN KEY \`FK_66f1d2b0d133bb6ddda6739a9fb\``);
        await queryRunner.query(`ALTER TABLE \`Funcionarios_convidados\` DROP FOREIGN KEY \`FK_50bb6dbfc38b7c408dc0ebd1973\``);
        await queryRunner.query(`ALTER TABLE \`Presenca\` DROP FOREIGN KEY \`FK_2769263adcec6e12e8a8950376b\``);
        await queryRunner.query(`ALTER TABLE \`Notificacao_convidados\` DROP FOREIGN KEY \`FK_2db1f5eae0532a74fe60d60dae8\``);
        await queryRunner.query(`ALTER TABLE \`Notificacao_convidados\` DROP FOREIGN KEY \`FK_bf5c5fca40a401d990ae8a2a3e8\``);
        await queryRunner.query(`ALTER TABLE \`Notificacao\` DROP FOREIGN KEY \`FK_13bf01535d8fd63e3838b6b238d\``);
        await queryRunner.query(`ALTER TABLE \`Vendas\` DROP FOREIGN KEY \`FK_c3a06704616da020d157ed7ce8d\``);
        await queryRunner.query(`ALTER TABLE \`Vendas\` DROP FOREIGN KEY \`FK_acdcb804cd337af00d52ff4b4bd\``);
        await queryRunner.query(`ALTER TABLE \`Agendamento_interacao\` DROP FOREIGN KEY \`FK_5efdc335b48e64f382d8deb2d84\``);
        await queryRunner.query(`ALTER TABLE \`Agendamento_interacao\` DROP FOREIGN KEY \`FK_4724e48aa6e4090f9fb842f13b8\``);
        await queryRunner.query(`ALTER TABLE \`Interacao_cliente\` DROP FOREIGN KEY \`FK_7e08f88cf18db9ae3d76baf1bb1\``);
        await queryRunner.query(`ALTER TABLE \`Interacao_cliente\` DROP FOREIGN KEY \`FK_67a8108793b88002a2bd16ac853\``);
        await queryRunner.query(`ALTER TABLE \`Interacao_cliente\` DROP FOREIGN KEY \`FK_cb34e5d245ba3c99e3a541d7ef9\``);
        await queryRunner.query(`DROP TABLE \`eventos\``);
        await queryRunner.query(`DROP TABLE \`Cliente\``);
        await queryRunner.query(`DROP TABLE \`Contato_cliente\``);
        await queryRunner.query(`DROP TABLE \`Funil_vendas\``);
        await queryRunner.query(`DROP TABLE \`Historico_funil\``);
        await queryRunner.query(`DROP INDEX \`IDX_0e2ca5f6f89d0a834ee47c195f\` ON \`Funcionario\``);
        await queryRunner.query(`DROP TABLE \`Funcionario\``);
        await queryRunner.query(`DROP TABLE \`Evento_treinamento\``);
        await queryRunner.query(`DROP TABLE \`Funcionarios_convidados\``);
        await queryRunner.query(`DROP TABLE \`Presenca\``);
        await queryRunner.query(`DROP TABLE \`Notificacao_convidados\``);
        await queryRunner.query(`DROP TABLE \`Notificacao\``);
        await queryRunner.query(`DROP TABLE \`Vendas\``);
        await queryRunner.query(`DROP TABLE \`Agendamento_interacao\``);
        await queryRunner.query(`DROP TABLE \`Interacao_cliente\``);
    }

}
