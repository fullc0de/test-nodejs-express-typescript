import { ControllerInterface } from '../../../../app/decorator/interface/controller-interface';
import { Context } from '../../../../app/decorator/interface/common-interfaces';
import { Route } from '../../../../app/decorator/route';

@Route("posts/:postId/comments", "v2")
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