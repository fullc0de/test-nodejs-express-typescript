import { PostController as V1 } from "../v1/post-controller";
import {Context} from "../../common/common-interfaces";
import { Route } from '../../decorator/route';

@Route("posts", "v2")
export class PostController extends V1 {
    public async index(ctx: Context) {

        ctx.response = {
            headers: { "Hello": "World" },
            statusCode: 200,
            body: { message: "wow success! V2" }
        };
    }
}
