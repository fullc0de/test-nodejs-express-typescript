import { HttpRequest, HttpResponse } from "./common-interfaces"
import { Resource, APIVer } from "../enum";
import BaseController from "./base-controller";
import v1Controller from "./v1";
import v2Controller from "./v2";

function createController(resource: Resource, version: APIVer, callback: (controller?: BaseController) => void) {
    switch (version) {
        case 'v1':
            callback(v1Controller(resource))
            break;
        case 'v2':
            callback(v2Controller(resource))
            break;
        default:
            callback(undefined)
            break;
    }
}

export {
    HttpRequest,
    HttpResponse,
    createController
}
