import { RegisterUser } from "../../app/usecase/register-user";
import dotenv from 'dotenv';
import { createConnection } from 'typeorm';
import { UseCaseError, UseCaseErrorCode } from "../../app/usecase/usecase-errors";

beforeAll(async (done) => {
    dotenv.config({path: `${__dirname}/../../.env.test`});
    const conns = await createConnection({
        "name": "default",
        "type": "postgres",
        "url": process.env.POSTGRES_URL,
        "entities": [
            "build/app/model/**/*.js"
        ],
        "migrations": [
            "build/app/migration/**/*.js"
        ],
        "synchronize": false,
        "dropSchema": true,
        "migrationsRun": true,
    });
    done();
});

describe("UseCase > register a user", () => {
    describe("registration with a facebook account", () => {
        it("should handle an invalid facebook token", async (done) => {            
            const fbToken = "lskjflwkejflwkejfwe";
            const usecase = new RegisterUser();

            try {
                const user = await usecase.register(fbToken, "hello", "world");
            } catch(e) {
                expect((e as UseCaseError).code).toBe(UseCaseErrorCode.InvalidParameter);
                expect((e as UseCaseError).message).toBe("failed to validate a facebook token");
            }
            done();
        });

        it("should register a user with relavent informations", async (done) => {
            const fbToken = process.env.FACEBOOK_TEST_TOKEN;
            const usecase = new RegisterUser();

            if (fbToken) {
                const user = await usecase.register(fbToken, "brad", "pitt", { address: "Hollywood" });
                expect(user.id.toString().length).toBeGreaterThan(0);
                expect(user.credential.id.toString().length).toBeGreaterThan(0);
                expect(user.credential.authToken.length).toBeGreaterThan(0);
                expect(user.credential.user).toBeFalsy();
            }
            done();
        });

        it("should reject signup if a duplication exists", async (done) => {
            const fbToken = process.env.FACEBOOK_TEST_TOKEN;
            const usecase = new RegisterUser();

            if (fbToken) {
                try {
                    const user = await usecase.register(fbToken, "brad", "pitt", { address: "Hollywood" });
                } catch(e) {
                    expect((e as UseCaseError).code).toBe(UseCaseErrorCode.Duplicate);
                }
            }
            done();
        });
    })
});