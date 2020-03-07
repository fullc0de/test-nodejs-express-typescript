import { Context, Route, UserAuth, ControllerInterface, DecoRouterError } from "versionable-express-router";
import BaseController from "../base-controller";
import { JwtAuthDecoInjector } from "../../deco-injector/jwt-auth-deco-injector";
import { getConnection } from "typeorm";
import { Users } from "../../model";
import InternalError from "../../common/internal-error";

@Route("users", "v1")
@UserAuth(new JwtAuthDecoInjector())
export class UserController extends BaseController implements ControllerInterface {
    
    public async show(ctx: Context) {
        const repo = getConnection().getRepository(Users);
        const user = await repo.findOne(ctx.request.params.id);
        if (user == null) {
            throw new DecoRouterError(500, "failed to find a user");
        }
        
        ctx.response.status(200).json({
            body: user
        });
    }
}
