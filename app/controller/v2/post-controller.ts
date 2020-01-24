import { PostController as V1 } from "../v1/post-controller";
import {HttpRequest, HttpResponse, Context} from "../common-interfaces";

export class PostController extends V1 {
    public async index(ctx: Context) {

        ctx.response = {
            headers: { "Hello": "World" },
            statusCode: 200,
            body: { message: "wow success! V2" }
        };
    }
}
