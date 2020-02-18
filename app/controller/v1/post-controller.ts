import {Context} from "../../deco-router/interface/common-interfaces";
import BaseController from "../base-controller";
import { ControllerInterface } from "../../deco-router/interface/controller-interface";
import { Route, UserAuth, QueryParam } from "../../deco-router";
import { JwtAuthDecoInjector } from '../../deco-injector/jwt-auth-deco-injector';

@Route("posts", "v1")
@UserAuth(new JwtAuthDecoInjector())
export class PostController extends BaseController implements ControllerInterface {
    
    public async index(ctx: Context) {

        ctx.response = {
            statusCode: 200,
            body: { message: "wow success! V1" }
        };
    }

    @QueryParam("postId", { required: true })
    public async show(ctx: Context) {
        ctx.response = {
            statusCode: 200,
            body: {
                id: ctx.additional.query.postId,
                author: "J. K. Rolling",
                title: "Harry Potter"
            }
        };
    }
}
