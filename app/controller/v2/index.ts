import {Resource} from "../../enum";
import { PostController } from "./post-controller";
import { SignUpController } from './signup-controller';
import { load as loadV1 } from '../v1/index';
import { ControllerInterface } from '../../deco-router/interface/controller-interface';

// export default function v2Controller(resource: Resource): ControllerInterface | undefined {
//     switch (resource) {
//         case Resource.SignUp:
//             return new SignUpController();
//         case Resource.Post:
//             return new PostController();
//         default:
//             return v1Controller(resource);
//     }
// }

export function load(): Function[] {
    let controllers = loadV1();

    function replace(targets: Function[]) {
        targets.forEach((target) => {
            const index = controllers.findIndex((cont) => {
                return cont.name == target.name;
            })
            controllers[index] = target;    
        })
    }

    replace([
        PostController,
        SignUpController
    ]);

    return controllers;
}
