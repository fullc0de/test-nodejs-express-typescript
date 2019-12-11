import {Router} from "express";
import PostRouter from "./post-router";

const router = Router()

router.use('/post', PostRouter)

router.get('/', (req, res, next) => {
    res.send("<h1>Welcome to root!</h1>")
})
export default router
