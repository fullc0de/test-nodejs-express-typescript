import { PostController } from "./post-controller";
import { CommentController } from './comment-controller';
import { Resource } from "../../enum";
import { ControllerInterface } from '../../deco-router/interface/controller-interface';

// export function v1Controller(resource: Resource): ControllerInterface | undefined {
//     switch (resource) {
//         case Resource.Post:
//             return new PostController()
//         case Resource.Comment:
//             return new CommentController()
//         default:
//             return undefined
//     }
// }

export function load(): any[] {
    return [
        PostController,
        CommentController,
    ]
}
