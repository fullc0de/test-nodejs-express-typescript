import BaseController from "../base-controller";
import { JwtAuthDecoInjector } from '../../deco-injector/jwt-auth-deco-injector';
import { Context, Route, UserAuth, ControllerInterface } from "versionable-express-router";

@Route("comments", "v1")
@UserAuth(new JwtAuthDecoInjector())
export class CommentController extends BaseController implements ControllerInterface {
    
    public async index(ctx: Context) {

        ctx.response.status(200).json({
            body: { message: "no comment at v1" }
        });
    }

    public async show(ctx: Context) {
        const commentId = ctx.request.params.id;

        ctx.response.status(200).json({
            body: {
                id: commentId,
                author: "kyokook",
                message: "Good job!!"
            }
        });
    }
}
