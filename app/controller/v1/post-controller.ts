import {Context} from "../../deco-router/interface/common-interfaces";
import BaseController from "../base-controller";
import { ControllerInterface } from "../../deco-router/interface/controller-interface";
import { Route } from "../../deco-router/decorator/route";
import { JwtAuthDecoInjector } from '../../deco-injector/jwt-auth-deco-injector';
import { UserAuth } from '../../deco-router/decorator/user-auth';

@Route("posts", "v1")
@UserAuth(new JwtAuthDecoInjector())
export class PostController extends BaseController implements ControllerInterface {
    
    public async index(ctx: Context) {

        ctx.response = {
            statusCode: 200,
            body: { message: "wow success! V1" }
        };
    }

    public async show(ctx: Context) {
        const postId = super.validateParamId(ctx.request.params.id)
        if (postId instanceof Error) {
            throw postId
        }
        
        ctx.response = {
            statusCode: 200,
            body: {
                id: postId,
                author: "J. K. Rolling",
                title: "Harry Potter"
            }
        };
    }
}
