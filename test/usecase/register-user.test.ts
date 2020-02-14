import { RegisterUser } from "../../app/usecase/register-user";
import { Users } from '../../app/model/users';
import dotenv from 'dotenv';
import { createConnection, getConnection } from 'typeorm';

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

            expect(usecase.register(fbToken, "hello", "world")).rejects.toBe("failed to validate a facebook token");
        });

        it("should handle an invalid facebook token", async () => {
            const fbToken = process.env.FACEBOOK_TEST_TOKEN;
            const usecase = new RegisterUser(getConnection());

            if (fbToken) {
                const user = await usecase.register(fbToken, "brad", "pitt", { address: "Hollywood" });
                console.log(`user = ${user}`);
                expect(user).toBeInstanceOf(Users);
            }
        });
    })
});