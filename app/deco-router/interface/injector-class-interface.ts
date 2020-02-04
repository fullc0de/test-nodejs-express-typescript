import { Context } from "./common-interfaces";

export abstract class BaseInjector {
    abstract inject(ctx: Context): Promise<void>;
}
