import { CommentController as V1 } from "../v1/comment-controller";
import {HttpRequest, HttpResponse} from "../interfaces";

export class CommentController extends V1 {
    public async test(request: HttpRequest): Promise<HttpResponse> {
        return {
            headers: {},
            statusCode: 200,
            body: {
                id: 333,
                author: "test",
                message: "test"
            }
        }
    }
}
