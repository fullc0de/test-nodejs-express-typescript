import {Router} from "express";
import postRouter from "./post-router";
import fs from "fs";
import * as path from "path";
import makePostRouter from "./post-router";
import makeCommentRouter from "./comment-router";

const router = Router()

router.get('/', (req, res) => {
    res.send("<h1>Welcome to ROOOOOOOT!!</h1>")
})

const controllerPath = path.join(__dirname, '../controller')

fs.readdirSync(controllerPath, {withFileTypes: true}).forEach( (dir) => {
    if (dir.name[0] === 'v') {
        router.use(`/api/${dir.name}/posts`, makePostRouter(dir.name))
        router.use(`/api/${dir.name}/comments`, makeCommentRouter(dir.name))
    }
})

export default router
