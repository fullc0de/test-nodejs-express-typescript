import "reflect-metadata";
import {Router} from "express";
import fs from "fs";
import * as path from "path";
import makePostRouter from "./post-router";
import makeCommentRouter from "./comment-router";
import makeAuthRouter from './auth-router';
import { APIVer, isAPIVer } from "../enum";

const router = Router();

router.get('/', (req, res) => {
    console.log(`process id = ${process.pid}`);
    res.send("<h1>Welcome to ROOT!!</h1>");
})

const controllerPath = path.join(__dirname, '../controller');

fs.readdirSync(controllerPath, {withFileTypes: true}).forEach( (dir) => {
    if (dir.name[0] === 'v') {
        if (isAPIVer(dir.name)) {
            router.use(`/api/${dir.name}/auth`, makeAuthRouter(<APIVer>dir.name));
            router.use(`/api/${dir.name}/posts`, makePostRouter(<APIVer>dir.name));
            router.use(`/api/${dir.name}/comments`, makeCommentRouter(<APIVer>dir.name));    
        }
    }
});

export default router;
