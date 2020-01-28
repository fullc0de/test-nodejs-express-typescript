import "reflect-metadata";

import {Router} from "express";
import fs from "fs";
import * as path from 'path';
import { isAPIVer } from "../enum";
import { getStore } from '../metadata/index';
import makeRouteCallback from '../router-callback';

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

