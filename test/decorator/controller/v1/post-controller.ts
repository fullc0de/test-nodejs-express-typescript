import { ControllerInterface } from '../../../../app/deco-router/interface/controller-interface';
import { Context } from '../../../../app/deco-router/interface/common-interfaces';
import { Route } from '../../../../app/deco-router/decorator/route';

@Route("posts", "v1")
export class PostController implements ControllerInterface {
    public async index(ctx: Context) {
        ctx.response = {
            statusCode: 200,
            body: { message: "post-controller-index-v1" }
        };
    }
    public async show(ctx: Context) {
        ctx.response = {
            statusCode: 200,
            body: { message: "post-controller-show-v1" }
        };
    }
    public async put(ctx: Context) {
        ctx.response = {
            statusCode: 200,
            body: { message: "post-controller-put-v1" }
        };
    }
    public async post(ctx: Context) {
        ctx.response = {
            statusCode: 200,
            body: { message: "post-controller-post-v1" }
        };
    }
    public async delete(ctx: Context) {
        ctx.response = {
            statusCode: 200,
            body: { message: "post-controller-delete-v1" }
        };
    }
}