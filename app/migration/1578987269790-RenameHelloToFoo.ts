import {MigrationInterface, QueryRunner} from "typeorm";

export class RenameHelloToFoo1578987269790 implements MigrationInterface {
    name = 'RenameHelloToFoo1578987269790'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.renameTable('hello', 'foo');
        await queryRunner.query('ALTER SEQUENCE "hello_id_seq" RENAME TO "foo_id_seq"', undefined);
        await queryRunner.renameTable('hello_bars_bar', 'foo_bars_bar');
        await queryRunner.renameColumn('foo_bars_bar', 'helloId', 'fooId');

        // await queryRunner.query(`CREATE TABLE "foo" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, "fooName" character varying, CONSTRAINT "PK_3955faa3e62aba1963fccbe0708" PRIMARY KEY ("id"))`, undefined);
        // await queryRunner.query(`CREATE TABLE "foo_bars_bar" ("fooId" integer NOT NULL, "barId" integer NOT NULL, CONSTRAINT "PK_9cfc3a5055309b66c375c7eb16e" PRIMARY KEY ("fooId", "barId"))`, undefined);
        // await queryRunner.query(`CREATE INDEX "IDX_25e89bc9363cd993976ff412d6" ON "foo_bars_bar" ("fooId") `, undefined);
        // await queryRunner.query(`CREATE INDEX "IDX_562bb0013587edef881e84ffe2" ON "foo_bars_bar" ("barId") `, undefined);
        // await queryRunner.query(`ALTER TABLE "foo_bars_bar" ADD CONSTRAINT "FK_25e89bc9363cd993976ff412d6d" FOREIGN KEY ("fooId") REFERENCES "foo"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        // await queryRunner.query(`ALTER TABLE "foo_bars_bar" ADD CONSTRAINT "FK_562bb0013587edef881e84ffe2a" FOREIGN KEY ("barId") REFERENCES "bar"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.renameColumn('foo_bars_bar', 'fooId', 'helloId');
        await queryRunner.renameTable('foo_bars_bar', 'hello_bars_bar');
        await queryRunner.renameTable('foo', 'hello');
        await queryRunner.query('ALTER SEQUENCE "foo_id_seq" RENAME TO "hello_id_seq"', undefined);
        

        // await queryRunner.query(`ALTER TABLE "foo_bars_bar" DROP CONSTRAINT "FK_562bb0013587edef881e84ffe2a"`, undefined);
        // await queryRunner.query(`ALTER TABLE "foo_bars_bar" DROP CONSTRAINT "FK_25e89bc9363cd993976ff412d6d"`, undefined);
        // await queryRunner.query(`DROP INDEX "IDX_562bb0013587edef881e84ffe2"`, undefined);
        // await queryRunner.query(`DROP INDEX "IDX_25e89bc9363cd993976ff412d6"`, undefined);
        // await queryRunner.query(`DROP TABLE "foo_bars_bar"`, undefined);
        // await queryRunner.query(`DROP TABLE "foo"`, undefined);
    }

}
