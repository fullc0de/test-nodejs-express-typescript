import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTest1579056448999 implements MigrationInterface {
    name = 'CreateTest1579056448999'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "tests" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, "name" character varying, CONSTRAINT "PK_4301ca51edf839623386860aed2" PRIMARY KEY ("id"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "tests"`, undefined);
    }

}
