import {PostController} from "./post-controller";
import {CommentController} from "./comment-controller";
import BaseController from "../base-controller";
import {Resource} from "../../enum";

export default function v2Controller(resource: Resource): BaseController | undefined {
    switch (resource) {
        case Resource.Post:
            return new PostController()
        case Resource.Comment:
            return new CommentController()
        default:
            return undefined
    }
}
