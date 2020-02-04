import { BaseInjector } from '../deco-router/interface/injector-class-interface';
import { Context } from '../deco-router/interface/common-interfaces';

export class LogDecoInjector extends BaseInjector {

    public async inject(ctx: Context) {
        console.log(`ctx log = ${JSON.stringify(ctx)}`);
    }
}