import {HttpRequest, HttpResponse, Context} from "../common-interfaces";
import BaseController from "../base-controller";
import PostControllerInterface from "../interface/post-controller-interface";

export class PostController extends BaseController implements PostControllerInterface {

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
