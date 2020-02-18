import dotenv from 'dotenv';
import { createConnection } from 'typeorm';
import { LookupUser } from '../../app/usecase/lookup-user';
import { RegisterUser } from '../../app/usecase/register-user';

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

describe("UseCase > look up a user", () => {
    describe("look up a user with a facebook account", () => {
        it("should find a user with already registered user with fb token", async (done) => {            
            const fbToken = process.env.FACEBOOK_TEST_TOKEN;

            const registerUseCase = new RegisterUser();

            const newUser = await registerUseCase.register(fbToken, "brad", "pitt", { address: "Hollywood" });

            const usecase = new LookupUser();

            const user = await usecase.facebook(fbToken);
            expect(user).toBeTruthy();
            if (user) {
                expect(user.id.toString().length).toBeGreaterThan(0);
                expect(user.id).toBe(newUser.id);
            }
            done();
        });
    })
});