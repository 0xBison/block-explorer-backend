import { MigrationInterface, QueryRunner } from 'typeorm';

export class GasPriceMigration1741835491001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('SQL_SCHEMA', process.env.SQL_SCHEMA);

    // Create schema if it doesn't exist
    await queryRunner.query(
      `CREATE SCHEMA IF NOT EXISTS "${process.env.SQL_SCHEMA}"`,
    );

    await queryRunner.query(`
      CREATE TABLE "${process.env.SQL_SCHEMA}"."gas_price" (
        "id" SERIAL NOT NULL,
        "gas_price" bigint NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_gas_price" PRIMARY KEY ("id")
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP TABLE "${process.env.SQL_SCHEMA}"."gas_price"`,
    );
  }
}
