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

function buildRouter(prefix: string): Router {
    const router = Router();

    router.get('/', (req, res) => {
        console.log(`process id = ${process.pid}`);
        res.send("<h1>Welcome to ROOT!!</h1>");
    })
    
//    const pathInfos = getStore().buildRoutes('api');




    const controllerPath = path.join(__dirname, '../controller');
    
    fs.readdirSync(controllerPath, {withFileTypes: true}).forEach( (dir) => {
        if (dir.name[0] === 'v') {
            if (isAPIVer(dir.name)) {
                let ctors = require(path.join(controllerPath, dir.name)).load();
                // ctors.forEach((ctor: any) => {
                //     const path = getStore().path(<APIVer>dir.name, ctor, `/${prefix}`);
                //     if (path != null) {
                //         const instance: ControllerInterface = new ctor();
                //         router.get(`${path}`, makeRouteCallback(bind(instance, instance.index)))
                //         router.get(`${path}/:id`, makeRouteCallback(bind(instance, instance.show)))
                //         router.post(`${path}`, makeRouteCallback(bind(instance, instance.post)))
                //         router.put(`${path}`, makeRouteCallback(bind(instance, instance.put)))
                //         router.delete(`${path}:id`, makeRouteCallback(bind(instance, instance.delete)))
                //         console.log(`route path = ${path}`);
                //     }
                // });


                // router.use(`/${prefix}/${dir.name}/auth`, makeAuthRouter(<APIVer>dir.name));
                // router.use(`/${prefix}/${dir.name}/posts`, makePostRouter(<APIVer>dir.name));
                // router.use(`/${prefix}/${dir.name}/comments`, makeCommentRouter(<APIVer>dir.name));    
            }
        }
    });

    return router;
}



export {
    buildRouter
}

