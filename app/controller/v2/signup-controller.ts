import BaseController from '../base-controller';
import { ControllerInterface } from '../../decorator/interface/controller-interface';
import { Context } from '../../decorator/interface/common-interfaces';
import { Route } from '../../decorator/route';
import { getConnection } from 'typeorm';
import { Users } from '../../model/users';
import InternalError from '../../common/internal-error';

@Route("signup", "v2")
export class SignUpController extends BaseController implements ControllerInterface {

    public async show(ctx: Context) {
        const repo = getConnection().getRepository(Users);
        const user = await repo.findOne(ctx.request.params.id);
        if (user == null) {
            throw new InternalError("failed to find a user");
        }
        
        user.dummy = "hello";

        ctx.response = {
            statusCode: 200,
            body: user
        };
    }


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
