import {Router} from "express";

import makeExpressCallback from "../router-callback";
import {createController} from "../controller";
import {Resource} from "../enum";
import CommentControllerInterface from "../controller/interface/comment-controller-interface";

function makeCommentRouter(version: string): Router {
    const commentRouter = Router({ mergeParams: true })

    createController(Resource.Comment, version, (controller) => {
        if (controller) {
            const commentInterface = controller as CommentControllerInterface
            commentRouter.get('/', makeExpressCallback(commentInterface.index))
            commentRouter.get('/test', makeExpressCallback(commentInterface.test))
            commentRouter.get('/:id', makeExpressCallback(commentInterface.show))
        }
    })

    return commentRouter
}

export default makeCommentRouter
