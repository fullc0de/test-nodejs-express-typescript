import {Router} from "express";

import {PostController as PostControllerV1 } from "../controller/v1/post-controller";
import {PostController as PostControllerV2 } from "../controller/v2/post-controller";
import {CommentController as CommentControllerV1 } from "../controller/v1/comment-controller";
import {CommentController as CommentControllerV2 } from "../controller/v2/comment-controller";
import {makeExpressCallback} from "../router-callback";

const postClassTable: { [key: string]: any } = {
    v1: PostControllerV1,
    v2: PostControllerV2
}

const commentClassTable: { [key: string]: any } = {
    v1: CommentControllerV1,
    v2: CommentControllerV2
}

function makePostRouter(version: string): Router {
    const postRouter = Router({ mergeParams: true })
    const postController = new postClassTable[version]()
    const commentController = new commentClassTable[version]()

    postRouter.get('/', makeExpressCallback(postController.index))
    postRouter.get('/:id', makeExpressCallback(postController.show))

    postRouter.get('/:postId/comments', makeExpressCallback(commentController.postComments))
    postRouter.get('/:postId/comments/:id', makeExpressCallback(commentController.postComment))

    return postRouter
}

export default makePostRouter
