import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateUserCredential1581581235565 implements MigrationInterface {
    name = 'CreateUserCredential1581581235565'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TYPE "user_credential_servicetype_enum" AS ENUM('facebook_service_id', 'google_service_id')`, undefined);
        await queryRunner.query(`CREATE TABLE "user_credential" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, "serviceType" "user_credential_servicetype_enum" NOT NULL DEFAULT 'facebook_service_id', "userServiceId" character varying NOT NULL, "authToken" character varying NOT NULL, CONSTRAINT "PK_12ba5f444da355e51efd7a1ff4f" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ADD "credentialId" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_d6d50143a16c49c49bf467ae541" UNIQUE ("credentialId")`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_d6d50143a16c49c49bf467ae541" FOREIGN KEY ("credentialId") REFERENCES "user_credential"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_d6d50143a16c49c49bf467ae541"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_d6d50143a16c49c49bf467ae541"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "credentialId"`, undefined);
        await queryRunner.query(`DROP TABLE "user_credential"`, undefined);
        await queryRunner.query(`DROP TYPE "user_credential_servicetype_enum"`, undefined);
    }

}
