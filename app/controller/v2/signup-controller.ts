import BaseController from '../base-controller';
import ControllerInterface from '../interface/controller-interface';
import { Context } from '../common-interfaces';
import { Route, SkipAuth } from '../../decorator/route';

@Route('signup')
export class SignUpController extends BaseController implements ControllerInterface {

    public async put(ctx: Context) {
        ctx.response = {
            statusCode: 500,
            body: { hello: "fwef" }
        };
    }
}

// test

// function Format(format: string) {
//     console.log(`Format designed: ${format}`);
//     return function (target: any, propertyKey: string) {
//         let metaKey = `property:${propertyKey}`;
//         Reflect.defineMetadata(metaKey, format, target, propertyKey);
//     };
// }

// function getFormat(target: any, propertyKey: string): string {
//     let metaKey = `property:${propertyKey}`;
//     return Reflect.getMetadata(metaKey, target, propertyKey);
// }
