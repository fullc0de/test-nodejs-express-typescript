import "reflect-metadata";
import {Router} from "express";
import fs from "fs";
import * as path from 'path';
// import makePostRouter from "./post-router";
// import makeCommentRouter from "./comment-router";
// import makeAuthRouter from './auth-router';
import { APIVer, isAPIVer, prevVer } from "../enum";
import { getStore } from '../metadata/index';
import ControllerInterface from '../controller/interface/controller-interface';
import makeRouteCallback from '../router-callback';
import { bind } from '../util';

type RouteMap = { [version: string]: { ctor: any, path: string }[] };

function buildRouter(prefix: string, controllerBasePath: string): Router {
    const router = Router();

    router.get('/', (req, res) => {
        console.log(`process id = ${process.pid}`);
        res.send("<h1>Welcome to ROOT!!</h1>");
    })
    
    fs.readdirSync(controllerBasePath, {withFileTypes: true}).forEach( (dir) => {
        if (dir.name[0] === 'v') {
            if (isAPIVer(dir.name)) {
                require(path.join(controllerBasePath, dir.name)).load();
            }
        }
    });

    const pathInfos = getStore().buildRoutes(prefix);
    pathInfos.forEach((info) => {
        switch (info.method) {
            case "get":
                router.get(info.path, makeRouteCallback(info.handler));
                break;
            case "post":
                router.post(info.path, makeRouteCallback(info.handler));
                break;
            case "put":
                router.put(info.path, makeRouteCallback(info.handler));
                break;
            case "delete":
                router.delete(info.path, makeRouteCallback(info.handler));
                break;
        }
    });

    return router;
}



export {
    buildRouter
}

