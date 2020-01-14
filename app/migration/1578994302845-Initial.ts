import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1578994302845 implements MigrationInterface {
    name = 'Initial1578994302845'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "foo" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, "fooName" character varying, CONSTRAINT "PK_3955faa3e62aba1963fccbe0708" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "bar" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, "barName" character varying, CONSTRAINT "PK_53ff54e517bee816c6f5233042c" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, "firstName" character varying, "lastName" character varying, "address" character varying, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "foo_bars_bar" ("fooId" integer NOT NULL, "barId" integer NOT NULL, CONSTRAINT "PK_9cfc3a5055309b66c375c7eb16e" PRIMARY KEY ("fooId", "barId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_25e89bc9363cd993976ff412d6" ON "foo_bars_bar" ("fooId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_562bb0013587edef881e84ffe2" ON "foo_bars_bar" ("barId") `, undefined);
        await queryRunner.query(`ALTER TABLE "foo_bars_bar" ADD CONSTRAINT "FK_25e89bc9363cd993976ff412d6d" FOREIGN KEY ("fooId") REFERENCES "foo"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "foo_bars_bar" ADD CONSTRAINT "FK_562bb0013587edef881e84ffe2a" FOREIGN KEY ("barId") REFERENCES "bar"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "foo_bars_bar" DROP CONSTRAINT "FK_562bb0013587edef881e84ffe2a"`, undefined);
        await queryRunner.query(`ALTER TABLE "foo_bars_bar" DROP CONSTRAINT "FK_25e89bc9363cd993976ff412d6d"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_562bb0013587edef881e84ffe2"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_25e89bc9363cd993976ff412d6"`, undefined);
        await queryRunner.query(`DROP TABLE "foo_bars_bar"`, undefined);
        await queryRunner.query(`DROP TABLE "users"`, undefined);
        await queryRunner.query(`DROP TABLE "bar"`, undefined);
        await queryRunner.query(`DROP TABLE "foo"`, undefined);
    }

}
