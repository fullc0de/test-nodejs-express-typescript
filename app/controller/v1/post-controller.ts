import {Context} from "../common-interfaces";
import BaseController from "../base-controller";
import ControllerInterface from "../interface/controller-interface";
import { Route } from "../../decorator/route";

@Route('posts')
export class PostController extends BaseController implements ControllerInterface {
    
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
