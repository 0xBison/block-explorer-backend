
import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1744958835231 implements MigrationInterface {
  name = 'InitialSchema1744958835231';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create schema if it doesn't exist
    await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS ${process.env.SQL_SCHEMA}`);
    
    await queryRunner.query(`CREATE TABLE ${process.env.SQL_SCHEMA}."approval_03753c8f" ("unique_event_id" character varying(64) NOT NULL, "event_origin_address" character varying(66) NOT NULL, "created_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "tx_index" numeric(5) NOT NULL, "log_index" numeric(5) NOT NULL, "log_data" character varying NOT NULL, "block_hash" character varying(66) NOT NULL, "block_number" bigint NOT NULL, "block_timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "transaction_hash" character varying(66) NOT NULL, "topics" character varying array NOT NULL, "src" character varying(66) NOT NULL, "guy" character varying(66) NOT NULL, "wad" numeric(78) NOT NULL, CONSTRAINT "PK_6ed602b56fb9d057b56988adaa7" PRIMARY KEY ("unique_event_id"))`);

    await queryRunner.query(`CREATE TABLE ${process.env.SQL_SCHEMA}."deposit_a9ebf685" ("unique_event_id" character varying(64) NOT NULL, "event_origin_address" character varying(66) NOT NULL, "created_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "tx_index" numeric(5) NOT NULL, "log_index" numeric(5) NOT NULL, "log_data" character varying NOT NULL, "block_hash" character varying(66) NOT NULL, "block_number" bigint NOT NULL, "block_timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "transaction_hash" character varying(66) NOT NULL, "topics" character varying array NOT NULL, "dst" character varying(66) NOT NULL, "wad" numeric(78) NOT NULL, CONSTRAINT "PK_65df2553e5105331694139a02ba" PRIMARY KEY ("unique_event_id"))`);

    await queryRunner.query(`CREATE TABLE ${process.env.SQL_SCHEMA}."withdrawal_c0605588" ("unique_event_id" character varying(64) NOT NULL, "event_origin_address" character varying(66) NOT NULL, "created_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "tx_index" numeric(5) NOT NULL, "log_index" numeric(5) NOT NULL, "log_data" character varying NOT NULL, "block_hash" character varying(66) NOT NULL, "block_number" bigint NOT NULL, "block_timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "transaction_hash" character varying(66) NOT NULL, "topics" character varying array NOT NULL, "src" character varying(66) NOT NULL, "wad" numeric(78) NOT NULL, CONSTRAINT "PK_d5e515df3f775b52c173476fc07" PRIMARY KEY ("unique_event_id"))`);

    await queryRunner.query(`CREATE TABLE ${process.env.SQL_SCHEMA}."transfer_fab013d9" ("unique_event_id" character varying(64) NOT NULL, "event_origin_address" character varying(66) NOT NULL, "created_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "tx_index" numeric(5) NOT NULL, "log_index" numeric(5) NOT NULL, "log_data" character varying NOT NULL, "block_hash" character varying(66) NOT NULL, "block_number" bigint NOT NULL, "block_timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "transaction_hash" character varying(66) NOT NULL, "topics" character varying array NOT NULL, "src" character varying(66) NOT NULL, "dst" character varying(66) NOT NULL, "wad" numeric(78) NOT NULL, CONSTRAINT "PK_ff1f533a84669008167e85b6ded" PRIMARY KEY ("unique_event_id"))`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS ${process.env.SQL_SCHEMA} CASCADE."approval_03753c8f"`);

    await queryRunner.query(`DROP TABLE IF EXISTS ${process.env.SQL_SCHEMA} CASCADE."deposit_a9ebf685"`);

    await queryRunner.query(`DROP TABLE IF EXISTS ${process.env.SQL_SCHEMA} CASCADE."withdrawal_c0605588"`);

    await queryRunner.query(`DROP TABLE IF EXISTS ${process.env.SQL_SCHEMA} CASCADE."transfer_fab013d9"`);
  }
}