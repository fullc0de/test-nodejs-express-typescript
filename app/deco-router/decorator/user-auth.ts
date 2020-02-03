import { ControllerInterface } from '../interface/controller-interface';
import { userAuthMap } from '../reflect-symbols';

/**
 * Register an injector for user authentication.
 * An injector will be called before calling a routing function.
 * @param injector an injector which implements InjectorInterface.
 * @returns Class decorator function.
 */
export function UserAuth<T extends ControllerInterface & Function>(injector: any) {
    return function (target: T) {
        Reflect.defineMetadata(userAuthMap, injector, target);
    }
}