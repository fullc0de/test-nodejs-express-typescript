import { InjectorInterface } from '../deco-router/interface/injector-interface';
import { Context } from '../deco-router/interface/common-interfaces';

export class LogDecoInjector implements InjectorInterface {

    public async inject(ctx: Context) {
        console.log(`ctx log = ${JSON.stringify(ctx)}`);
    }

    public constructor() {}
}