import { InjectorInterface } from '../deco-router';
import { Context } from '../deco-router';

export class LogDecoInjector implements InjectorInterface {

    public async inject(ctx: Context) {
        console.log(`ctx log = ${JSON.stringify(ctx)}`);
    }
}