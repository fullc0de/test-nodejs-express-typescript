import { Context, Route, UserAuth, PostParam, QueryParam } from "deco-versioning-router";
import { PostController as V1 } from "../v1/post-controller";
import { JwtAuthDecoInjector } from '../../deco-injector/jwt-auth-deco-injector';
import { Users } from '../../model/users';
import validator from 'validator';

@Route("posts", "v2")
@UserAuth(new JwtAuthDecoInjector())
export class PostController extends V1 {

    @QueryParam("testParam", { required: true })
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

    @PostParam("hello", { required: false })
    @PostParam("age", { required: true, validate: (v) => validator.isInt(v), errorMessage: "'age' param must be an integer." })
    public async post(ctx: Context) {
        ctx.response = {
            statusCode: 200,
            body: { 
                message: "posting done V2",
                dummy: ctx.request.query.dummyQuery,
                age: ctx.request.body.age,
                hello: ctx.request.body.hello
            }
        };
    }
}
