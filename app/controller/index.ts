import { HttpRequest, HttpResponse } from "../decorator/interface/common-interfaces"
import { Resource, APIVer } from "../enum";
// import v1Controller from "./v1";
// import v2Controller from "./v2";
import { ControllerInterface } from "../decorator/interface/controller-interface";

// function createController(resource: Resource, version: APIVer, callback: (controller?: ControllerInterface) => void) {
//     switch (version) {
//         case 'v1':
//             callback(v1Controller(resource))
//             break;
//         case 'v2':
//             callback(v2Controller(resource))
//             break;
//         default:
//             callback(undefined)
//             break;
//     }
// }

export {
    HttpRequest,
    HttpResponse,
//    createController
}
