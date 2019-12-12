import {HttpRequest, HttpResponse} from "../interfaces";
import BaseController from "../base-controller";

export class CommentController extends BaseController {

    public async index(request: HttpRequest): Promise<HttpResponse> {
        return {
            statusCode: 200,
            body: { message: "no comment" }
        }
    }

    public async show(request: HttpRequest): Promise<HttpResponse> {
        const commentId = super.validateParamId(request.params.id)
        return {
            statusCode: 200,
            body: {
                id: commentId,
                author: "Heath Hwang",
                message: "Good job!!"
            }
        }
    }

    public async postComments(request: HttpRequest): Promise<HttpResponse> {
        const params = request.params
        return {
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
        }
    }

    public async postComment(request: HttpRequest): Promise<HttpResponse> {
        const postId = super.validateParamId(request.params.postId)
        const commentId = super.validateParamId(request.params.id)
        return {
            statusCode: 200,
            body: {
                id: commentId,
                post_id: postId,
                author: "Heath Hwang",
                message: "Good job!!"
            }
        }
    }
}
