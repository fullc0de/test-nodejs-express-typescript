import { Context, Route, ControllerInterface, PostParam, DecoRouterError } from "deco-router";
import BaseController from '../base-controller';
import validator from 'validator';
import { RegisterUser } from '../../usecase/register-user';
import { UseCaseError } from '../../usecase/usecase-errors';

@Route("signup", "v2")
export class SignUpController extends BaseController implements ControllerInterface {

    // query param validator is needed
    @PostParam("serviceType", { 
        required: true,
        validate: (value) => value === "facebook" || value == "google", 
        errorMessage: "unknown service type" 
    })
    @PostParam("serviceToken", { required: true })
    @PostParam("firstName", { required: true })
    @PostParam("lastName", { required: true })
    @PostParam("address", { required: false })
    @PostParam("age", { 
        required: false, 
        validate: (value) => validator.isInt(value), 
        errorMessage: "'age' must be a number" 
    })
    public async post(ctx: Context) {
        const serviceType = ctx.request.body.serviceType;
        const serviceToken = ctx.request.body.serviceToken;
        const firstName = ctx.request.body.firstName;
        const lastName = ctx.request.body.lastName;
        const address = ctx.request.body.address;
        const age = ctx.request.body.age;

        const usecase = new RegisterUser();

        if (serviceType === "facebook") {
            try {
                const user = await usecase.register(serviceToken, firstName, lastName, { address: address });
                ctx.response = {
                    statusCode: 200,
                    body: {
                        data: user
                    }
                }
            } catch(e) {
                throw new DecoRouterError(500, (e as UseCaseError).message);
            }
        } else {
            throw new DecoRouterError(500, `unsupported service type: ${serviceType}`);
        }
    }
}

