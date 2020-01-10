import {Router} from "express";

import makeExpressCallback from "../router-callback";
import {createController} from "../controller";
import {Resource, APIVer} from "../enum";
import PostControllerInterface from "../controller/interface/post-controller-interface";
import CommentControllerInterface from "../controller/interface/comment-controller-interface";

function makePostRouter(version: APIVer): Router {
    const postRouter = Router({ mergeParams: true })

    createController(Resource.Post, version, (controller) => {
        if (controller) {
            const postInterface = controller as PostControllerInterface
            postRouter.get('/', makeExpressCallback(postInterface.index))
            postRouter.get('/:id', makeExpressCallback(postInterface.show))
        }
    })

    createController(Resource.Comment, version, (controller) => {
        if (controller) {
            const commentInterface = controller as CommentControllerInterface
            postRouter.get('/:postId/comments', makeExpressCallback(commentInterface.postComments))
            postRouter.get('/:postId/comments/:id', makeExpressCallback(commentInterface.postComment))
        }
    })

    return postRouter
}

export default makePostRouter
