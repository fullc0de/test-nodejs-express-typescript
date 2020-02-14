import { RegisterUser } from "../../app/usecase/register-user";
import { Users } from '../../app/model/users';
import dotenv from 'dotenv';
import { createConnection, getConnection } from 'typeorm';
import { UseCaseError, UseCaseErrorCode } from "../../app/usecase/usecase-errors";
import { UserCredential } from '../../app/model/user-credential';

beforeAll(async () => {
    return (async () => {
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
    })();
});

describe("UseCase > register a user", () => {
    describe("registration with a facebook account", () => {
        it("should handle an invalid facebook token", async () => {            
            const fbToken = "lskjflwkejflwkejfwe";
            const usecase = new RegisterUser(getConnection());

            try {
                const user = await usecase.register(fbToken, "hello", "world");
            } catch(e) {
                expect((e as UseCaseError).code).toBe(UseCaseErrorCode.InvalidParameter);
                expect((e as UseCaseError).message).toBe("failed to validate a facebook token");
            }
        });

        it("should register a user with relavent informations", async () => {
            const fbToken = process.env.FACEBOOK_TEST_TOKEN;
            const usecase = new RegisterUser(getConnection());

            if (fbToken) {
                const user = await usecase.register(fbToken, "brad", "pitt", { address: "Hollywood" });
                expect(user.id.toString().length).toBeGreaterThan(0);
                expect(user.credential.id.toString().length).toBeGreaterThan(0);
                expect(user.credential.authToken.length).toBeGreaterThan(0);
                expect(user.credential.user).toBeFalsy();
            }
        });

        it("should reject signup if a duplication exists", async () => {
            const fbToken = process.env.FACEBOOK_TEST_TOKEN;
            const usecase = new RegisterUser(getConnection());

            if (fbToken) {
                try {
                    const user = await usecase.register(fbToken, "brad", "pitt", { address: "Hollywood" });
                } catch(e) {
                    expect((e as UseCaseError).code).toBe(UseCaseErrorCode.Duplicate);
                }
            }
        });
    })
});