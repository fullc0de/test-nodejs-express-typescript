import { ControllerInterface } from '../../../../app/deco-router/interface/controller-interface';
import { Context } from '../../../../app/deco-router/interface/common-interfaces';
import { Route } from '../../../../app/deco-router/decorator/route';

@Route("users", "v1")
export class UserController implements ControllerInterface {
    public async index(ctx: Context) {
        ctx.response = {
            statusCode: 200,
            body: { message: "user-controller-index-v1" }
        };
    }
    public async show(ctx: Context) {
        ctx.response = {
            statusCode: 200,
            body: { message: "user-controller-show-v1" }
        };
    }
    public async put(ctx: Context) {
        ctx.response = {
            statusCode: 200,
            body: { message: "user-controller-put-v1" }
        };
    }
    public async post(ctx: Context) {
        ctx.response = {
            statusCode: 200,
            body: { message: "user-controller-post-v1" }
        };
    }
    public async delete(ctx: Context) {
        ctx.response = {
            statusCode: 200,
            body: { message: "user-controller-delete-v1" }
        };
    }
}