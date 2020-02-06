import { Route } from "../../deco-router/decorator/route";
import { UserAuth } from "../../deco-router/decorator/user-auth";
import { JwtAuthDecoInjector } from "../../deco-injector/jwt-auth-deco-injector";
import BaseController from "../base-controller";
import { ControllerInterface } from "../../deco-router/interface/controller-interface";
import { Context } from "../../deco-router/interface/common-interfaces";
import { getConnection } from "typeorm";
import { Users } from "../../model";
import InternalError from "../../common/internal-error";
import { PostParam } from '../../deco-router/decorator/post-param';
import validator from 'validator';

@Route("users", "v1")
@UserAuth(new JwtAuthDecoInjector())
export class UserController extends BaseController implements ControllerInterface {
    
    public async show(ctx: Context) {
        const repo = getConnection().getRepository(Users);
        const user = await repo.findOne(ctx.request.params.id);
        if (user == null) {
            throw new InternalError("failed to find a user");
        }
        
        user.dummy = "hello";

        ctx.response = {
            statusCode: 200,
            body: user
        };
    }

    // query param validator is needed
    @PostParam("firstName", { required: true })
    @PostParam("lastName", { required: true })
    @PostParam("address", { required: true })
    @PostParam("age", { 
        required: false, 
        validate: (value) => validator.isInt(value), 
        errorMessage: "'age' must be a number" 
    })
    public async post(ctx: Context) {
        const repo = getConnection().getRepository(Users);
        const firstName = ctx.request.body.firstName;
        const lastName = ctx.request.body.lastName;
        const address = ctx.request.body.address;
        const age = ctx.request.body.age;

        let newUser = new Users();
        newUser.firstName = firstName;
        newUser.lastName = lastName;
        newUser.address = address;

        newUser = await repo.save(newUser);

        ctx.response = {
            statusCode: 200,
            body: newUser
        }
    }
}