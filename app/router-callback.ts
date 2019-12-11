import {HttpRequest, HttpResponse} from "./controller";
import {Request, Response} from "express";

function makeExpressCallback(controller: (request: HttpRequest) => Promise<HttpResponse>): (req: Request, res: Response) => void {
    return async (req, res) => {
        const httpReq: HttpRequest = {
            body: req.body,
            query: req.query,
            params: req.params,
            headers: {
                'Content-Type': req.get('Content-Type'),
                Referer: req.get('referer'),
                'User-Agent': req.get('User-Agent')
            }
        }
        try {
            let httpRes = await controller(httpReq)
            if (httpRes.headers) {
                res.set(httpRes.headers)
            }
            res.type('json')
            res.status(httpRes.statusCode).send(httpRes.body)
        } catch (e) {
            res.status(500).send({ error: "internal error has been occurred"})
        }
    }
}

export {
    makeExpressCallback
}
