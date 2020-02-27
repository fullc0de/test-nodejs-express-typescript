import { JwtAuthDecoInjector } from '../../app/deco-injector/jwt-auth-deco-injector';
import * as typeorm from 'typeorm';
import jwt from 'jsonwebtoken';
import { Users } from '../../app/model/users';
import { Context, DecoRouterError } from 'deco-versioning-router';

(typeorm as any).getConnection = jest.fn();

describe("JWT Auth deco-injector", () => {
    it("should make deco route exception if 'Authorization' header doesn't exist", async (done) => {
        process.env.JWT_TOKEN_SECRET = "test_private_key";
        const injector = new JwtAuthDecoInjector();
        const ctx: Context = {
            request: {
                body: {},
                query: {},
                params: {},
                headers: {}
            },
            additional: {}
        }
        try {
            await injector.inject(ctx);
        } catch(e) {
            if (e instanceof DecoRouterError) {
                expect(e.statusCode).toBe(403);
            }
        }
        done();
    })

    it("should set user model to the additional in the context", async (done) => {
        const token = jwt.sign({ userId: 1 }, "test_private_key");
        process.env.JWT_TOKEN_SECRET = "test_private_key";

        const mockUser = new Users();
        mockUser.id = 1;
        mockUser.firstName = "gildong";
        mockUser.lastName = "hong";

        (typeorm as any).getConnection.mockReturnValue({
            getRepository: () => {
                return {
                    findOne: () => Promise.resolve(mockUser)
                }
            }
        });

        const injector = new JwtAuthDecoInjector();
        const ctx: Context = {
            request: {
                body: {},
                query: {},
                params: {},
                headers: {
                    authorization: token
                }
            },
            additional: {}
        }
        await injector.inject(ctx);
        const user = ctx.additional["user"];
        expect(user.constructor.name).toEqual("Users");
        expect(user.firstName).toEqual("gildong");
        expect(user.lastName).toEqual("hong");
        done();
    })
})