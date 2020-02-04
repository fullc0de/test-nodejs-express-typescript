import { Context } from "./common-interfaces";

export abstract class BaseRenderer {
    abstract render(ctx: Context): Promise<void>;
}