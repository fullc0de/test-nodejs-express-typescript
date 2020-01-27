import ControllerInterface from '../../../../controller/interface/controller-interface';
import { Context } from '../../../../controller/common-interfaces';

class UserController implements ControllerInterface {
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