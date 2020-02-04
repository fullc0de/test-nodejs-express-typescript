import { ControllerInterface } from '../interface/controller-interface';
import { UserAuthMap } from '../reflect-symbols';
import { BaseInjector } from '../interface/injector-class-interface';

/**
 * Register an injector for user authentication.
 * An injector will be called before calling a routing function.
 * @param injector an injector which implements InjectorInterface.
 * @returns Class decorator function.
 */
export function UserAuth<T extends ControllerInterface & Function, I extends BaseInjector>(injector: I) {
    return function (target: T) {
        Reflect.defineMetadata(UserAuthMap, injector, target);
    }
}