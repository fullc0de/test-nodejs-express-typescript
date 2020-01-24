import {Router} from "express";

import makeRouteCallback from "../router-callback";
import {createController} from "../controller";
import {Resource, APIVer} from "../enum";
import CommentControllerInterface from "../controller/interface/comment-controller-interface";
import { bind } from '../util';

function makeCommentRouter(version: APIVer): Router {
    const commentRouter = Router({ mergeParams: true })

    createController(Resource.Comment, version, (controller) => {
        if (controller) {
            const ci = controller as CommentControllerInterface
            //commentRouter.get('/', makeRouteCallback(bind(ci, ci.index)))
            commentRouter.get('/', makeRouteCallback(bind(ci, ci.index)))
            commentRouter.get('/test', makeRouteCallback(bind(ci, ci.test)))
            commentRouter.get('/:id', makeRouteCallback(bind(ci, ci.show)))
        }
    })

    return commentRouter
}

export default makeCommentRouter
