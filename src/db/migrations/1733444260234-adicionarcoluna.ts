import { MigrationInterface, QueryRunner } from "typeorm";

export class Adicionarcoluna1733444260234 implements MigrationInterface {
    name = 'Adicionarcoluna1733444260234'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pix_transactions" ADD "qrCodeImage" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pix_transactions" DROP COLUMN "qrCodeImage"`);
    }

}
