import {Router} from "express";
import {CommentController as CommentControllerV1 } from "../controller/v1/comment-controller";
import {CommentController as CommentControllerV2 } from "../controller/v2/comment-controller";
import {makeExpressCallback} from "../router-callback";

const commentClassTable: { [key: string]: any } = {
    v1: CommentControllerV1,
    v2: CommentControllerV2
}

function makeCommentRouter(version: string): Router {
    const commentRouter = Router({ mergeParams: true })
    const commentController = new commentClassTable[version]()

    commentRouter.get('/', makeExpressCallback(commentController.index))
    commentRouter.get('/test', makeExpressCallback(commentController.test))
    commentRouter.get('/:id', makeExpressCallback(commentController.show))


    return commentRouter
}

export default makeCommentRouter
