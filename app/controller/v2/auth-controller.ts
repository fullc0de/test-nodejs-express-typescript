import BaseController from '../base-controller';
import AuthControllerInterface from '../interface/auth-controller-interface';
import { HttpRequest, HttpResponse } from '../common-interfaces';
import { format } from 'path';

export class AuthController extends BaseController implements AuthControllerInterface {

    @Format("My name: %s")
    public userName: string = "heath";
    
    @SkipAuth()
    public async signup(request: HttpRequest): Promise<HttpResponse> {
        console.log(`name = ${this.userName}`);
        let format = getFormat(this, "userName");
        console.log(`format = [${format}]`);
        return {
            statusCode: 500,
            body: { hello: format.replace("%s", this.userName) }
        }
    }
}

function SkipAuth() {
    console.log("SkipAuth: evaluated!");
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log(`SkipAuth: called, target=${target}, propertyKey=${propertyKey}, descriptor=${descriptor}`);
    }
}

function Format(format: string) {
    return Reflect.metadata(Symbol("Format"), format);
}

function getFormat(target: any, propertyKey: string): string {
    return Reflect.getMetadata(Symbol("Format"), target, propertyKey);
}
