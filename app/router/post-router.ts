import {Router} from "express";
import {PostController} from "../controller/post-controller";
import {makeExpressCallback} from "../router-callback";
import {CommentController} from "../controller/comment-controller";

const postRouter = Router({ mergeParams: true })
const postController = new PostController()
const commentController = new CommentController()

postRouter.get('/', makeExpressCallback(postController.index))
postRouter.get('/:id', makeExpressCallback(postController.show))

postRouter.get('/:postId/comments', makeExpressCallback(commentController.postComments))
postRouter.get('/:postId/comments/:id', makeExpressCallback(commentController.postComment))

export default postRouter
