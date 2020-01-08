import BaseController from '../base-controller';
import AuthControllerInterface from '../interface/auth-controller-interface';
import { HttpRequest, HttpResponse } from '../common-interfaces';

export class AuthController extends BaseController implements AuthControllerInterface {

    public async signup(request: HttpRequest): Promise<HttpResponse> {

        return {
            statusCode: 500,
            body: { hello: 'world' }
        }
    }
}