import getCallerFile from 'get-caller-file';
import * as sysPath from "path";
import { getStore } from '../metadata/index';
import { APIVer, isAPIVer } from '../enum';
import ControllerInterface from '../controller/interface/controller-interface';

export function Route<T extends ControllerInterface & Function>(path: string, version: string) {
//    console.log(`Route deco called: path = ${path}`);
    return function (target: T) {
//        const modulePath: string = getCallerFile(4);
//        console.log(`Route deco evaluated: caller_dirpath = '${modulePath}', path = '${path}', module_name = '${target.name}'`);
//        const ver = <APIVer>modulePath.split(sysPath.sep).slice(-2, -1)[0];
        if (isAPIVer(version)) {
            getStore().registerRoute(path, version, target);
        }
    }
}

export function SkipAuth() {
//    console.log("SkipAuth: evaluated!");
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {
//        console.log(`SkipAuth: called, target=${target}, propertyKey=${propertyKey}, descriptor=${descriptor}`);

        let method = descriptor.value;

        descriptor.value = function (...args: any[]) {
            args.map(a => JSON.stringify(a)).forEach(j => console.log(`j = ${j}`));
            
            const result = method.apply(this, args);
            return result;
        }
        
        return descriptor;
    }
}