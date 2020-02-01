import {Router} from "express";
import fs from "fs";
import * as path from 'path';
import { isAPIVer } from "../enum";
import { getStore } from '../metadata/index';
import makeExpressRoute from './express-router';
import { TokenAutoInterface } from './interface/service-interface';

export function buildRouter(prefix: string, controllerBasePath: string): Router {
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
                router.get(info.path, makeExpressRoute(info.handler));
                break;
            case "post":
                router.post(info.path, makeExpressRoute(info.handler));
                break;
            case "put":
                router.put(info.path, makeExpressRoute(info.handler));
                break;
            case "delete":
                router.delete(info.path, makeExpressRoute(info.handler));
                break;
        }
    });

    return router;
}

let tokenAuthService: TokenAutoInterface | undefined = undefined;
export function registerTokenAuth(service: TokenAutoInterface) {
    tokenAuthService = service;
}

export function getTokenAuthService(): TokenAutoInterface | undefined {
    return tokenAuthService;
}
