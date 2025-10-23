import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateClienteTrigger1978901234567 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TRIGGER trg_after_cliente_update
      AFTER UPDATE ON Cliente
      FOR EACH ROW
      BEGIN
        IF NOT (OLD.funil_ID <=> NEW.funil_ID) THEN
          INSERT INTO Historico_funil (cliente_ID, funil_ID, data_movimentacao)
          VALUES (NEW.cliente_ID, NEW.funil_ID, NOW());
        END IF;
      END`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TRIGGER IF EXISTS trg_after_cliente_update;`);
  }
}