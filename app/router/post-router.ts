import {Router} from "express";

import makeRouteCallback from "../router-callback";
import {createController} from "../controller";
import {Resource, APIVer} from "../enum";
import PostControllerInterface from "../controller/interface/post-controller-interface";
import CommentControllerInterface from "../controller/interface/comment-controller-interface";
import { bind } from "../util";

function makePostRouter(version: APIVer): Router {
    const postRouter = Router({ mergeParams: true })

    createController(Resource.Post, version, (controller) => {
        if (controller) {
            const pi = controller as PostControllerInterface
            postRouter.get('/', makeRouteCallback(bind(pi, pi.index)))
            postRouter.get('/:id', makeRouteCallback(bind(pi, pi.show)))
        }
    })

    createController(Resource.Comment, version, (controller) => {
        if (controller) {
            const ci = controller as CommentControllerInterface
            postRouter.get('/:postId/comments', makeRouteCallback(bind(ci, ci.postComments)))
            postRouter.get('/:postId/comments/:id', makeRouteCallback(bind(ci, ci.postComment)))
        }
    })

    return postRouter
}

export default makePostRouter
