import ControllerInterface from '../../../../controller/interface/controller-interface';
import { Context } from '../../../../controller/common-interfaces';
import { Route } from '../../../../decorator/route';

@Route("posts/:postId/comments")
export class PostCommentController implements ControllerInterface {
    public async index(ctx: Context) {
        ctx.response = {
            statusCode: 200,
            body: { message: "post-comment-controller-index-v2" }
        };
    }

    public async show(ctx: Context) {
        ctx.response = {
            statusCode: 200,
            body: { message: "post-comment-controller-show-v2" }
        };
    }
}