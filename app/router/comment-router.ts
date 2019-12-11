import {Router} from "express";
import {CommentController} from "../controller/comment-controller";
import {makeExpressCallback} from "../router-callback";

const commentRouter = Router({ mergeParams: true })
const commentController = new CommentController()

commentRouter.get('/', makeExpressCallback(commentController.index))
commentRouter.get('/:id', makeExpressCallback(commentController.show))

export default commentRouter
