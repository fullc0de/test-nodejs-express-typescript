import { APIVer, prevVer } from "../enum";
import { RoutableFunction } from "../controller/common-interfaces";
import ControllerInterface from '../controller/interface/controller-interface';
import assert from "assert";

interface RouteMetadataInterface {
    version: APIVer,
    path: string, 
    ctor: any
}

export interface RouteInfo {
    path: string,
    controller: ControllerInterface
}

export class MetadataStorage {

    private routes: RouteMetadataInterface[] = [];

    public registerRoute(path: string, version: APIVer, ctor: any) {
        this.routes.push({
            version: version,
            ctor: ctor,
            path: path
        });
    }
    
    public buildRoutes(prefix?: string): RouteInfo[] {
        let sortedRoutes = this.routes
        .sort((a, b) => a.version > b.version ? 1 : -1)
        .sort((a, b) => a.path > b.path ? -1 : 1);

        let versionMap: { [version: string]: RouteMetadataInterface[] } = {};

        sortedRoutes.forEach((route) => {
            let targetPaths = versionMap[route.version];
            if (targetPaths == null) {
                let prev = prevVer(route.version);
                if (prev) {
                    let prevPaths = versionMap[prev];
                    if (prevPaths) {
                        targetPaths = Object.assign([], prevPaths);
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

        let routeInfos: RouteInfo[] = [];
        for(let key in versionMap) {
            versionMap[key].forEach((route) => {
                routeInfos.push({
                    path: `${prefix != null ? prefix : ''}/${route.version}/${route.path}`,
                    controller: route.ctor
                })
            })
        }

        return routeInfos;
    }
}