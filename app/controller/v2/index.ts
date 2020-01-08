import {Resource} from "../../enum";
import BaseController from "../base-controller";
import {PostController} from "./post-controller";
import {CommentController} from "./comment-controller";
import { AuthController } from './auth-controller';

export default function v2Controller(resource: Resource): BaseController | undefined {
    switch (resource) {
        case Resource.Auth:
            return new AuthController();
        case Resource.Post:
            return new PostController();
        case Resource.Comment:
            return new CommentController();
        default:
            return undefined;
    }
}
