import { MigrationInterface, QueryRunner } from "typeorm";

export class createNewTable1664207686380 implements MigrationInterface {
    name = 'createNewTable1664207686380'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "first_name" character varying(50) NOT NULL, "last_name" character varying(50) NOT NULL, "email" character varying(50) NOT NULL, "password" character varying(50) NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
