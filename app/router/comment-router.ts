import {Router} from "express";

import makeExpressCallback from "../router-callback";
import {createController} from "../controller";
import {Resource, APIVer} from "../enum";
import CommentControllerInterface from "../controller/interface/comment-controller-interface";
import { bind } from '../util';

function makeCommentRouter(version: APIVer): Router {
    const commentRouter = Router({ mergeParams: true })

    createController(Resource.Comment, version, (controller) => {
        if (controller) {
            const ci = controller as CommentControllerInterface
            commentRouter.get('/', makeExpressCallback(bind(ci, ci.index)))
            commentRouter.get('/test', makeExpressCallback(bind(ci, ci.test)))
            commentRouter.get('/:id', makeExpressCallback(bind(ci, ci.show)))
        }
    })

    return commentRouter
}

export default makeCommentRouter
