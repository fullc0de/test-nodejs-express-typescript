import { InjectorInterface } from '../decorator/interface/injector-interface';
import { Context } from '../decorator/interface/common-interfaces';

export class LogDecoInjector implements InjectorInterface {

    public async inject(ctx: Context) {
        console.log(`ctx log = ${JSON.stringify(ctx)}`);
    }

    public constructor() {}
}