import getCallerFile from 'get-caller-file';
import { getStore } from '../../metadata/index';
import { isAPIVer } from '../../enum';
import { ControllerInterface } from '../interface/controller-interface';
import { userAuthMap } from '../reflect-symbols';

export function Route<T extends ControllerInterface & Function>(path: string, version: string) {
    return function (target: T) {
        const authInjector = Reflect.getOwnMetadata(userAuthMap, target);
        console.log(`Route deco evaluated: path = '${path}', module_name = '${target.name}', authInjector = '${authInjector}'`);
        if (isAPIVer(version)) {
            getStore().registerRoute(path, version, target, { userAuthInjector: authInjector });
        }
    }
}

// export function SkipAuth() {
// //    console.log("SkipAuth: evaluated!");
//     return function (target: any, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {
// //        console.log(`SkipAuth: called, target=${target}, propertyKey=${propertyKey}, descriptor=${descriptor}`);

//         let method = descriptor.value;

//         descriptor.value = function (...args: any[]) {
//             args.map(a => JSON.stringify(a)).forEach(j => console.log(`j = ${j}`));
            
//             const result = method.apply(this, args);
//             return result;
//         }
        
//         return descriptor;
//     }
// }