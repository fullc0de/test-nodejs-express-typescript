import BaseController from "../base-controller";
import { JwtAuthDecoInjector } from '../../deco-injector/jwt-auth-deco-injector';
import { Context, Route, UserAuth, ControllerInterface, QueryParam } from "versionable-express-router";

@Route("posts", "v1")
@UserAuth(new JwtAuthDecoInjector())
export class PostController extends BaseController implements ControllerInterface {
    
    public async index(ctx: Context) {
        ctx.response.status(200).json({
            body: { message: "wow success! V1" }
        });
    }

    @QueryParam("postId", { required: true })
    public async show(ctx: Context) {
        ctx.response.status(200).json({
            body: {
                id: ctx.request.params.id,
                postId: ctx.request.query.postId,
                author: "J. K. Rolling",
                title: "Harry Potter"
            }
        });
    }
}
