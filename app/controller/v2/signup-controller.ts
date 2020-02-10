import BaseController from '../base-controller';
import { ControllerInterface } from '../../deco-router/interface/controller-interface';
import { Context } from '../../deco-router/interface/common-interfaces';
import { Route } from '../../deco-router/decorator/route';
import { getConnection } from 'typeorm';
import { Users } from '../../model/users';
import InternalError from '../../common/internal-error';
import jwt from 'jsonwebtoken';
import { DecoRouterError } from '../../deco-router/deco-router-error';

@Route("signup", "v2")
export class SignUpController extends BaseController implements ControllerInterface {

    public async index(ctx: Context) {
        ctx.response = {
            statusCode: 200,
            body: { message: "signed up!" }
        };
    }
    // public async put(ctx: Context) {
    //     const repo = getConnection().getRepository(Users);
    //     const user = await repo.findOne(ctx.request.params.id);
    //     if (user == null) {
    //         throw new InternalError("failed to find a user");
    //     }
        
    //     user.dummy = "hello";

    //     ctx.response = {
    //         statusCode: 200,
    //         body: user
    //     };
    // }

    public async post(ctx: Context) {
        const privateKey: string | undefined = process.env.JWT_TOKEN_SECRET;
        if (privateKey == null) {
            throw new DecoRouterError(500, "failed to create a token. maybe because of absence of a secret key");
        }
        var token = jwt.sign({ userId: 1 }, privateKey);

        ctx.response = {
            statusCode: 200,
            body: { token: token }
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
