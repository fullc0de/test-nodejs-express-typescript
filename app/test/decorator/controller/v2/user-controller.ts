import ControllerInterface from '../../../../controller/interface/controller-interface';
import { Context } from '../../../../controller/common-interfaces';
import { Route } from '../../../../decorator/route';
import { UserController as V1 } from '../v1/user-controller';

@Route("users")
export class UserController extends V1 implements ControllerInterface {
    public async index(ctx: Context) {
        ctx.response = {
            statusCode: 200,
            body: { message: "user-controller-index-v2" }
        };
    }

    public async show(ctx: Context) {
        ctx.response = {
            statusCode: 200,
            body: { message: "user-controller-show-v2" }
        };
    }
}