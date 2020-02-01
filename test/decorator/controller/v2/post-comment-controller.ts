import ControllerInterface from '../../../../app/controller/interface/controller-interface';
import { Context } from '../../../../app/common/common-interfaces';
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