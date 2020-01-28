import ControllerInterface from '../../../../controller/interface/controller-interface';
import { Context } from '../../../../controller/common-interfaces';
import { Route } from '../../../../decorator/route';

@Route("users")
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