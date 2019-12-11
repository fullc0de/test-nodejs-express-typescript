import {Router} from "express";
import postRouter from "./post-router";
import commentRouter from "./comment-router";

const router = Router()

router.get('/', (req, res) => {
    res.send("<h1>Welcome to root!</h1>")
})

router.use('/posts', postRouter)
router.use('/comments', commentRouter)

export default router
