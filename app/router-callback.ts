import {Request, Response} from "express";
import { RoutableFunction, HttpRequest } from "./controller/common-interfaces";

export default function makeExpressCallback(callback?: RoutableFunction): (req: Request, res: Response) => void {
    return async (req, res) => {
        if (callback === undefined) {
            res.status(500).send({ error: "No routing function defined"});
            return;
        }

        const httpReq: HttpRequest = {
            body: req.body,
            query: req.query,
            params: req.params,
            headers: {
                'Content-Type': req.get('Content-Type'),
                Referer: req.get('referer'),
                'User-Agent': req.get('User-Agent')
            }
        };
        try {
            let httpRes = await callback(httpReq);
            if (httpRes.headers) {
                res.set(httpRes.headers);
            }
            res.type('json');
            res.status(httpRes.statusCode).send(httpRes.body);
        } catch (e) {
            res.status(500).send({ error: `internal error has been occurred. (${e.message})`});
        }
    };
}

