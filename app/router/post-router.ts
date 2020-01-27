import {Router} from "express";

// import makeRouteCallback from "../router-callback";
// import {createController} from "../controller";
// import {Resource, APIVer} from "../enum";
// import { bind } from "../util";

// function makePostRouter(version: APIVer): Router {
//     const postRouter = Router({ mergeParams: true })

//     createController(Resource.Post, version, (controller) => {
//         if (controller) {
//             postRouter.get('/', makeRouteCallback(bind(controller, controller.index)))
//             postRouter.get('/:id', makeRouteCallback(bind(controller, controller.show)))
//         }
//     })

//     return postRouter
// }

// export default makePostRouter
