import { Context, Route, UserAuth, ControllerInterface } from "versionable-express-router";
import BaseController from "../base-controller";
import { JwtAuthDecoInjector } from "../../deco-injector/jwt-auth-deco-injector";
import { getConnection } from "typeorm";
import { Users } from "../../model";
import InternalError from "../../common/internal-error";

@Route("me", "v1")
@UserAuth(new JwtAuthDecoInjector())
export class MeController extends BaseController implements ControllerInterface {
    
    public async index(ctx: Context) {
        const user = ctx.additional["user"];
        if (user == null) {
            throw new InternalError("failed to find a user");
        }
        
        ctx.response = {
            statusCode: 200,
            body: user
        };
    }
}
