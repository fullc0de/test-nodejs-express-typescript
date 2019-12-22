import {HttpRequest, HttpResponse} from "./interfaces"
import {Resource} from "../enum";
import BaseController from "./base-controller";
import v1Controller from "./v1";
import v2Controller from "./v2";

function createController(resource: Resource, version: string, callback: (controller?: BaseController) => void) {
    switch (version) {
        case "v1":
            callback(v1Controller(resource))
        case "v2":
            callback(v2Controller(resource))
        default:
            callback(undefined)
    }
}

export {
    HttpRequest,
    HttpResponse,
    createController
}
