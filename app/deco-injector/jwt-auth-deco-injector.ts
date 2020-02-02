import { InjectorInterface } from '../decorator/interface/injector-interface';
import { Context } from '../decorator/interface/common-interfaces';

export class JwtAuthDecoInjector implements InjectorInterface {
    private privateKey: string;

    public async inject(ctx: Context) {
        ctx.additional["token"] = `hello token key = [${this.privateKey}]`;
        console.log(`auth log: ${ctx.additional["token"]}`);
    }

    public constructor(key: string) {
        this.privateKey = key;
    }
}