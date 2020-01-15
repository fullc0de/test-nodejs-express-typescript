import {MigrationInterface, QueryRunner} from "typeorm";

export class RenameTest1579057221901 implements MigrationInterface {
    name = 'RenameTest1579057221901'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.renameTable('tests', 'renamed_tests');
        //await queryRunner.query(`CREATE TABLE "renamed_tests" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, "name" character varying, CONSTRAINT "PK_2a1187e2fca81944989c03c9b7b" PRIMARY KEY ("id"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.renameTable('renamed_tests', 'tests');
        //await queryRunner.query(`DROP TABLE "renamed_tests"`, undefined);
    }

}
