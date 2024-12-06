import { MigrationInterface, QueryRunner } from "typeorm";

export class Criartabela1733443397471 implements MigrationInterface {
    name = 'Criartabela1733443397471'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "pix_transactions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "merchantName" character varying NOT NULL, "merchantCity" character varying NOT NULL, "pixKey" character varying NOT NULL, "infoAdicional" character varying, "transactionAmount" numeric(10,2) NOT NULL, "brCode" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_562bf33096e8e54c578236985fd" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "pix_transactions"`);
    }

}
