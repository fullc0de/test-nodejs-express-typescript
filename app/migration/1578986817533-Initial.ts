import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1578986817533 implements MigrationInterface {
    name = 'Initial1578986817533'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "hello" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, "fooName" character varying, CONSTRAINT "PK_8a11c3956fec7db6df1a0244e5f" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "bar" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, "barName" character varying, CONSTRAINT "PK_53ff54e517bee816c6f5233042c" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, "firstName" character varying, "lastName" character varying, "address" character varying, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "hello_bars_bar" ("helloId" integer NOT NULL, "barId" integer NOT NULL, CONSTRAINT "PK_dde89221f080b587c6c710fe8ad" PRIMARY KEY ("helloId", "barId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_8c446694d2db9e315fc95ea3ec" ON "hello_bars_bar" ("helloId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_3d4c24f4c3142df6c3043edc8c" ON "hello_bars_bar" ("barId") `, undefined);
        await queryRunner.query(`ALTER TABLE "hello_bars_bar" ADD CONSTRAINT "FK_8c446694d2db9e315fc95ea3ecd" FOREIGN KEY ("helloId") REFERENCES "hello"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "hello_bars_bar" ADD CONSTRAINT "FK_3d4c24f4c3142df6c3043edc8cf" FOREIGN KEY ("barId") REFERENCES "bar"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "hello_bars_bar" DROP CONSTRAINT "FK_3d4c24f4c3142df6c3043edc8cf"`, undefined);
        await queryRunner.query(`ALTER TABLE "hello_bars_bar" DROP CONSTRAINT "FK_8c446694d2db9e315fc95ea3ecd"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_3d4c24f4c3142df6c3043edc8c"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_8c446694d2db9e315fc95ea3ec"`, undefined);
        await queryRunner.query(`DROP TABLE "hello_bars_bar"`, undefined);
        await queryRunner.query(`DROP TABLE "users"`, undefined);
        await queryRunner.query(`DROP TABLE "bar"`, undefined);
        await queryRunner.query(`DROP TABLE "hello"`, undefined);
    }
}
