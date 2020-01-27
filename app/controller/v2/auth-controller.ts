import BaseController from '../base-controller';
import AuthControllerInterface from '../interface/auth-controller-interface';
import { HttpRequest, HttpResponse, Context } from '../common-interfaces';

export class AuthController extends BaseController implements AuthControllerInterface {

    @Format("My name = %s")
    public userName: string = "heath";
    
    @SkipAuth()
    public async signup(ctx: Context) {
        let format = getFormat(this, "userName");

        ctx.response = {
            statusCode: 500,
            body: { hello: format.replace("%s", this.userName) }
        };
    }
}

function SkipAuth() {
    console.log("SkipAuth: evaluated!");
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {
//        console.log(`SkipAuth: called, target=${target}, propertyKey=${propertyKey}, descriptor=${descriptor}`);

        let method = descriptor.value;

        console.log("change method!");
        descriptor.value = function (...args: any[]) {
            args.map(a => JSON.stringify(a)).forEach(j => console.log(`j = ${j}`));
            
            const result = method.apply(this, args);
            return result;
        }

        return descriptor;
    }
}

function Format(format: string) {
    console.log(`Format designed: ${format}`);
    return function (target: any, propertyKey: string) {
        let metaKey = `property:${propertyKey}`;
        Reflect.defineMetadata(metaKey, format, target, propertyKey);
    };
}

function getFormat(target: any, propertyKey: string): string {
    let metaKey = `property:${propertyKey}`;
    return Reflect.getMetadata(metaKey, target, propertyKey);
}
