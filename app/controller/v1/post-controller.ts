import {HttpRequest, HttpResponse} from "../common-interfaces";
import BaseController from "../base-controller";
import PostControllerInterface from "../interface/post-controller-interface";

export class PostController extends BaseController implements PostControllerInterface {

    public async index(request: HttpRequest): Promise<HttpResponse> {
        return {
            statusCode: 200,
            body: { message: "wow success! V1" }
        }
    }

    public async show(request: HttpRequest): Promise<HttpResponse> {
        const postId = super.validateParamId(request.params.id)
        if (postId instanceof Error) {
            throw postId
        }
        
        return {
            statusCode: 200,
            body: {
                id: postId,
                author: "J. K. Rolling",
                title: "Harry Potter"
            }
        }
    }
}
