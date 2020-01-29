import {HttpRequest, HttpResponse, Context} from "../../common/common-interfaces";
import BaseController from "../base-controller";
import ControllerInterface from "../interface/controller-interface";
import { Route } from "../../decorator/route";

@Route("comments")
export class CommentController extends BaseController implements ControllerInterface {
    
    public async index(ctx: Context) {

        ctx.response = {
            statusCode: 200,
            body: { message: "no comment at v1" }
        };
    }

    public async show(ctx: Context) {
        const commentId = super.validateParamId(ctx.request.params.id);

        ctx.response = {
            statusCode: 200,
            body: {
                id: commentId,
                author: "kyokook",
                message: "Good job!!"
            }
        };
    }

    public async postComments(ctx: Context) {
        const params = ctx.request.params;

        ctx.response = {
            statusCode: 200,
            body: [{
                id: 1,
                post_id: params.postId,
                author: "Heath Hwang",
                message: "Good job!!"
            },{
                id: 2,
                post_id: params.postId,
                author: "Kyokook Hwang",
                message: "Nice job!!"
            }]
        };
    }

    public async postComment(ctx: Context) {
        const postId = super.validateParamId(ctx.request.params.postId);
        const commentId = super.validateParamId(ctx.request.params.id);

        ctx.response = {
            statusCode: 200,
            body: {
                id: commentId,
                post_id: postId,
                author: "Heath Hwang",
                message: "Good job!!"
            }
        };
    }
}
