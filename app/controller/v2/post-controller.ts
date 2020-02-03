import { PostController as V1 } from "../v1/post-controller";
import {Context} from "../../deco-router/interface/common-interfaces";
import { Route } from '../../deco-router/decorator/route';
import { JwtAuthDecoInjector } from '../../deco-injector/jwt-auth-deco-injector';
import { UserAuth } from '../../deco-router/decorator/user-auth';
import { Users } from '../../model/users';

@Route("posts", "v2")
@UserAuth(JwtAuthDecoInjector)
export class PostController extends V1 {
    public async index(ctx: Context) {
        const user: Users = ctx.additional['user'];

        ctx.response = {
            headers: { "Hello": "World" },
            statusCode: 200,
            body: { 
                message: "wow success! V2",
                author: `${user.firstName} ${user.lastName}`
            }
        };
    }
}
