import { JwtAuthDecoInjector } from '../../app/deco-injector/jwt-auth-deco-injector';
import { Context } from '../../app/deco-router/interface/common-interfaces';
import { DecoRouterError } from '../../app/deco-router/deco-router-error';
import { createConnections } from 'typeorm';

beforeAll(async () => {
    return (async () => {
        const conns = await createConnections([{
            "name": "default",
            "type": "postgres",
            "url": 'postgres://postgres:123456@127.0.0.1/test',
            "entities": [
                "build/app/model/**/*.js"
            ],
            "synchronize": false,
        }]);
    })();
});

describe("JWT Auth deco-injector", () => {
    it("should make deco route exception if 'Authorization' header doesn't exist", async () => {
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
            expect(e.constructor.name).toBe(DecoRouterError.name);
            if (e instanceof DecoRouterError) {
                expect(e.statusCode).toBe(403);
            }
        }
    })

    // it("should set user model to the additional in the context", async () => {
    //     const injector = new JwtAuthDecoInjector();
    //     const ctx: Context = {
    //         request: {
    //             body: {},
    //             query: {},
    //             params: {},
    //             headers: {
    //                 authorization: "test-token"
    //             }
    //         },
    //         additional: {}
    //     }
    //     await injector.inject(ctx);
    //     const user = ctx.additional["user"];
    //     expect(user).toBeDefined();
    // })
})