import {Router} from "express";

import makeExpressCallback from "../router-callback";
import {createController} from "../controller";
import {Resource, APIVer} from "../enum";
import AuthControllerInterface from "../controller/interface/auth-controller-interface";
import { bind } from "../util";

export default function makeAuthRouter(version: APIVer): Router {
    const authRouter = Router({ mergeParams: true });

    createController(Resource.Auth, version, (controller) => {
        if (controller != null) {
            const ai = controller as AuthControllerInterface;
            authRouter.get('/signup', makeExpressCallback(bind(ai, ai.signup)));
        }
    });

    return authRouter;
}
