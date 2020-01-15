import {MigrationInterface, QueryRunner} from "typeorm";

export class DropRenamedTest1579060716661 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('renamed_tests', true);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "renamed_tests" ("id" SERIAL NOT NULL PRIMARY KEY, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, "name" character varying)`, undefined);
    }
}
