import { PostController as V1 } from "../v1/post-controller";
import {HttpRequest, HttpResponse} from "../interfaces";

export class PostController extends V1 {
    public async index(request: HttpRequest): Promise<HttpResponse> {
        return {
            headers: { "Hello": "World" },
            statusCode: 200,
            body: { message: "wow success! V2" }
        }
    }
}
