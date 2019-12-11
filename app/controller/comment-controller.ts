import {HttpRequest, HttpResponse} from "./interfaces";

export class CommentController {

    public async index(request: HttpRequest): Promise<HttpResponse> {
        return {
            headers: {},
            statusCode: 200,
            body: { message: "no comment" }
        }
    }

    public async show(request: HttpRequest): Promise<HttpResponse> {
        const params = request.params
        return {
            headers: {},
            statusCode: 200,
            body: {
                id: params.id,
                author: "Heath Hwang",
                message: "Good job!!"
            }
        }
    }

    public async postComments(request: HttpRequest): Promise<HttpResponse> {
        const params = request.params
        return {
            headers: {},
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
        const params = request.params
        return {
            headers: {},
            statusCode: 200,
            body: {
                id: params.id,
                post_id: params.postId,
                author: "Heath Hwang",
                message: "Good job!!"
            }
        }
    }
}
