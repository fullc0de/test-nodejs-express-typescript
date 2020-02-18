import {Router} from "express";
import fs from "fs";
import * as path from 'path';
import { isAPIVer } from "../enum";
import { getStore } from './metadata/index';
import makeExpressRoute from './express-router';
import { InjectorInterface } from './interface/injector-interface';
import { Context } from "./interface/common-interfaces";
import { RouteMetadataOptionsInterface } from './metadata/metadata-storage';
import { RouteCallbacks } from './express-router';
import { RequestParamMetadata } from './interface/common-interfaces';
import { ValidateQueryParamMap, ValidatePostParamMap } from './reflect-symbols';
import _ from "lodash";
import { DecoRouterError } from './deco-router-error';
import { ControllerInterface } from './interface/controller-interface';
export * from "./decorator/route";
export * from "./decorator/user-auth";
export * from "./decorator/post-param";
export * from "./decorator/query-param";
export * from "./deco-router-error";
export * from "./interface/injector-interface";
export * from "./interface/common-interfaces";
export * from "./metadata";

let beforeInjectors: InjectorInterface[] | undefined = undefined;
export function registerBeforeInjectors(injectors: InjectorInterface[]) {
    beforeInjectors = injectors;
}

let afterInjectors: InjectorInterface[] | undefined = undefined;
export function registerAfterInjectors(injectors: InjectorInterface[]) {
    afterInjectors = injectors;
}

export function buildRouter(prefix: string, controllersOrBasePath: ControllerInterface[] | string): Router {
    const router = Router();

    router.get('/', (req, res) => {
        console.log(`process id = ${process.pid}`);
        res.send("<h1>Welcome to ROOT!!</h1>");
    })
    
    if (typeof controllersOrBasePath == "string") {
        fs.readdirSync(controllersOrBasePath, {withFileTypes: true}).forEach( (dir) => {
            if (dir.name[0] === 'v') {
                if (isAPIVer(dir.name)) {
                    require(path.join(controllersOrBasePath, dir.name));
                }
            }
        });    
    }

    const pathInfos = getStore().buildRoutes(prefix);
    pathInfos.forEach((info) => {
        const queryParamMetaList = Reflect.getOwnMetadata(ValidateQueryParamMap, info.ctor, info.handler.name);
        const postParamMetaList = Reflect.getOwnMetadata(ValidatePostParamMap, info.ctor, info.handler.name);

        const callbacks: RouteCallbacks = {
            routeCallback: info.handler,
            paramValidateCallback: makeReqParamValidateCallback(_.flatten([queryParamMetaList || [], postParamMetaList || []])),
            beforeCallback: makeBeforeCallback(info.routeOptions),
            afterCallback: makeAfterCallback(info.routeOptions)
        }

        console.log(`path = [${info.method}][${info.path}]`);
        switch (info.method) {
            case "get":
                router.get(info.path, makeExpressRoute(callbacks));
                break;
            case "post":
                router.post(info.path, makeExpressRoute(callbacks));
                break;
            case "put":
                router.put(info.path, makeExpressRoute(callbacks));
                break;
            case "delete":
                router.delete(info.path, makeExpressRoute(callbacks));
                break;
        }
    });

    return router;
}

function makeReqParamValidateCallback(metadataList: RequestParamMetadata[]) {
    return async (ctx: Context) => {
        metadataList.forEach((data) => {
            console.log(`key=${data.paramKey}, required=${data.options.required.toString()}, type=${data.type}`);
            let value: string | undefined = undefined;
            if (data.type == "query") {
                value = ctx.request.query[data.paramKey];
            } else if (data.type == "post") {
                value = ctx.request.body[data.paramKey];
            }
            if (data.options.required && value == null) {
                throw new DecoRouterError(400, `'${data.paramKey}' parameter is required. param_type: [${data.type}]`);
            }
            if (value) {
                if (data.options.validate) {
                    if (data.options.validate(value) == false) {
                        throw new DecoRouterError(400, data.options.errorMessage || `'${value}' of '${data.paramKey}' key is invalid.`);
                    }
                }
            }
        });
    }
}

function makeBeforeCallback(routeOptions: RouteMetadataOptionsInterface) {
    return async (ctx: Context) => {

        if (routeOptions.userAuthInjector) {
            const authInjector = routeOptions.userAuthInjector;
            await authInjector.inject(ctx);    
        }

        if (beforeInjectors) {
            for(const i of beforeInjectors) {
                await i.inject(ctx);
            }
        }
    }
} 

function makeAfterCallback(routeOptions: RouteMetadataOptionsInterface) {
    return async (ctx: Context) => {
        if (afterInjectors) {
            for(const i of afterInjectors) {
                await i.inject(ctx);
            }
        }
    }
}