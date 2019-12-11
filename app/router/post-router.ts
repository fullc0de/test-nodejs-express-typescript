import {Router} from "express";
import {PostController} from "../controller/post-controller";
import {makeExpressCallback} from "../router-callback";

const postRouter = Router({ mergeParams: true })
const postController = new PostController()

postRouter.get('/', makeExpressCallback(postController.index))
postRouter.get('/:id', makeExpressCallback(postController.show))

export default postRouter
