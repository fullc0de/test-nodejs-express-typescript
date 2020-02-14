import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateUserCredential1581665030399 implements MigrationInterface {
    name = 'CreateUserCredential1581665030399'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TYPE "user_credential_servicetype_enum" AS ENUM('facebook_service_id', 'google_service_id')`, undefined);
        await queryRunner.query(`CREATE TABLE "user_credential" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, "serviceType" "user_credential_servicetype_enum" NOT NULL DEFAULT 'facebook_service_id', "userServiceId" character varying NOT NULL, "authToken" character varying NOT NULL, "userId" integer, CONSTRAINT "REL_8e6ecd93d94d74454b2ad8ba8f" UNIQUE ("userId"), CONSTRAINT "PK_12ba5f444da355e51efd7a1ff4f" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "user_credential" ADD CONSTRAINT "FK_8e6ecd93d94d74454b2ad8ba8f8" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user_credential" DROP CONSTRAINT "FK_8e6ecd93d94d74454b2ad8ba8f8"`, undefined);
        await queryRunner.query(`DROP TABLE "user_credential"`, undefined);
        await queryRunner.query(`DROP TYPE "user_credential_servicetype_enum"`, undefined);
    }

}
