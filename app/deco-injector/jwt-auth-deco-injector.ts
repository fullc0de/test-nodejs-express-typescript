import { Context, InjectorInterface, DecoRouterError } from "versionable-express-router";
import { getConnection } from 'typeorm';
import { Users } from '../model/users';
import jwt from 'jsonwebtoken';

export class JwtAuthDecoInjector implements InjectorInterface {
    private privateKey: string | undefined = process.env.JWT_TOKEN_SECRET;

    public async inject(ctx: Context) {
        if (this.privateKey == null) {
            throw new DecoRouterError(500, "Token secret must be provided.");
        }

        const token = ctx.request.headers['authorization'];
        if (token) {
            const decoded: any = jwt.verify(token, this.privateKey);

            ctx.additional["token"] = token;
            const repo = getConnection().getRepository(Users);
            const user = await repo.findOne(decoded.userId);
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