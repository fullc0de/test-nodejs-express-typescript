import { APIVer, prevVer } from "../enum";
import { RoutableFunction } from "../controller/common-interfaces";
import ControllerInterface from '../controller/interface/controller-interface';
import * as _ from "lodash";


interface RouteMetadataInterface {
    version: APIVer,
    path: string, 
    ctor: any,
    handlers: ControllerInterface
}

export interface RouteInfo {
    method: "get"|"post"|"put"|"delete",
    path: string,
    handler: RoutableFunction
}

export class MetadataStorage {

    private routes: RouteMetadataInterface[] = [];

    public registerRoute(path: string, version: APIVer, ctor: any) {
        this.routes.push({
            version: version,
            path: path,
            ctor: ctor,
            handlers: {
                index: ctor.prototype?.index,
                show: ctor.prototype?.show,
                post: ctor.prototype?.post,
                put: ctor.prototype?.put,
                delete: ctor.prototype?.delete
            }
        });
    }
    
    public buildRoutes(prefix?: string): RouteInfo[] {
        let sortedRoutes = this.routes
        .sort((a, b) => {
            if (a.version > b.version) {
                return 1;
            } else if (a.version < b.version) {
                return -1;
            } else {
                return a.path < b.path ? 1 : -1;
            }
        });

        let versionMap: { [version: string]: RouteMetadataInterface[] } = {};

        sortedRoutes.forEach((route) => {
            let targetPaths = versionMap[route.version];
            if (targetPaths == null) {
                let prev = prevVer(route.version);
                if (prev) {
                    let prevPaths = versionMap[prev];
                    if (prevPaths) {
                        targetPaths = prevPaths.map((r) => _.cloneDeep(r));
                        targetPaths = targetPaths.filter((r) => r.path !== route.path);
                        targetPaths.forEach((r) => {
                            r.version = route.version;
                        });
                    } else {
                        targetPaths = [];
                    }
                } else {
                    targetPaths = [];
                }
            }
            
            targetPaths.push(route);
            versionMap[route.version] = targetPaths;
        });

        // versionMap["v1"].forEach((r) => console.log(`v1 [${r.path}] index handler = ${r.handlers.index}`));
        // versionMap["v2"].forEach((r) => console.log(`v2 [${r.path}] index handler = ${r.handlers.index}`));

        let routeInfos: RouteInfo[] = [];
        for(let key in versionMap) {
            let pathPrefix = "/";
            if (prefix) {
                pathPrefix += prefix;
            }
            versionMap[key].forEach((route) => {
                if (route.handlers.index) {
                    routeInfos.push({
                        method: "get",
                        path: `${pathPrefix}/${route.version}/${route.path}`,
                        handler: route.handlers.index
                    })    
                }

                if (route.handlers.show) {
                    routeInfos.push({
                        method: "get",
                        path: `${pathPrefix}/${route.version}/${route.path}/:id`,
                        handler: route.handlers.show
                    })    
                }

                if (route.handlers.post) {
                    routeInfos.push({
                        method: "post",
                        path: `${pathPrefix}/${route.version}/${route.path}`,
                        handler: route.handlers.post
                    })    
                }

                if (route.handlers.put) {
                    routeInfos.push({
                        method: "put",
                        path: `${pathPrefix}/${route.version}/${route.path}/:id`,
                        handler: route.handlers.put
                    })    
                }

                if (route.handlers.delete) {
                    routeInfos.push({
                        method: "delete",
                        path: `${pathPrefix}/${route.version}/${route.path}/:id`,
                        handler: route.handlers.delete
                    })    
                }
            })
        }

        return routeInfos;
    }
}