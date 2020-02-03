import { InjectorInterface } from '../deco-router/interface/injector-interface';
import { Context } from '../deco-router/interface/common-interfaces';
import { DecoRouterError } from '../deco-router/deco-router-error';
import { getConnection } from 'typeorm';
import { Users } from '../model/users';

export class JwtAuthDecoInjector implements InjectorInterface {
    private privateKey: string = "private key";

    public async inject(ctx: Context) {
        const token = ctx.request.headers['authorization'];
        if (token) {
            ctx.additional["token"] = token;
            const repo = getConnection().getRepository(Users);
            const user = await repo.findOne(1);
            if (user) {
                ctx.additional["user"] = user;
            } else {
                throw new DecoRouterError(403, "invalid token");
            }
        } else {
            throw new DecoRouterError(403, "an auth token is expected to be a value of 'Authorization' header");
        }
    }
}