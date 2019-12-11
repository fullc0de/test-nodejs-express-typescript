import {HttpRequest, HttpResponse} from "../interfaces";
import BaseController from "../base-controller";

export class PostController extends BaseController {

    public async index(request: HttpRequest): Promise<HttpResponse> {
        return {
            headers: { "Hello": "World" },
            statusCode: 200,
            body: { message: "wow success! V1" }
        }
    }

    public async show(request: HttpRequest): Promise<HttpResponse> {
        const postId = super.validateParamId(request.params.id)
        return {
            headers: { "Hello": "World" },
            statusCode: 200,
            body: {
                id: postId,
                author: "J. K. Rolling",
                title: "Harry Potter"
            }
        }
    }
}
