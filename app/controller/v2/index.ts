import {Resource} from "../../enum";
import BaseController from "../base-controller";
import {PostController} from "./post-controller";
import { AuthController } from './auth-controller';
import v1Controller from '../v1/index';

export default function v2Controller(resource: Resource): BaseController | undefined {
    switch (resource) {
        case Resource.Auth:
            return new AuthController();
        case Resource.Post:
            return new PostController();
        default:
            return v1Controller(resource);
    }
}
