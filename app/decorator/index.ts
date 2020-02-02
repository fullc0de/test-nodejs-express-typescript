import {Router} from "express";
import fs from "fs";
import * as path from 'path';
import { isAPIVer } from "../enum";
import { getStore } from '../metadata/index';
import makeExpressRoute from './express-router';
import { InjectorInterface } from './interface/injector-interface';
import { Context } from "./interface/common-interfaces";

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

    const beforeCallback = async (ctx: Context) => {
        if (beforeInjectors) {
            for(const i of beforeInjectors) {
                await i.inject(ctx);
            }
        }
    }

    const afterCallback = async (ctx: Context) => {
        if (afterInjectors) {
            for(const i of afterInjectors) {
                await i.inject(ctx);
            }
        }
    }

    const pathInfos = getStore().buildRoutes(prefix);
    pathInfos.forEach((info) => {
        switch (info.method) {
            case "get":
                router.get(info.path, makeExpressRoute(info.handler, beforeCallback, afterCallback));
                break;
            case "post":
                router.post(info.path, makeExpressRoute(info.handler, beforeCallback, afterCallback));
                break;
            case "put":
                router.put(info.path, makeExpressRoute(info.handler, beforeCallback, afterCallback));
                break;
            case "delete":
                router.delete(info.path, makeExpressRoute(info.handler, beforeCallback, afterCallback));
                break;
        }
    });

    return router;
}

let beforeInjectors: InjectorInterface[] | undefined = undefined;
export function registerBeforeInjectors(injectors: InjectorInterface[]) {
    beforeInjectors = injectors;
}

let afterInjectors: InjectorInterface[] | undefined = undefined;
export function registerAfterInjectors(injectors: InjectorInterface[]) {
    afterInjectors = injectors;
}
