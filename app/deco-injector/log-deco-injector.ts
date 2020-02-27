import { Context, InjectorInterface } from 'deco-versioning-router';

export class LogDecoInjector implements InjectorInterface {

    public async inject(ctx: Context) {
        console.log(`ctx log = ${JSON.stringify(ctx)}`);
    }
}