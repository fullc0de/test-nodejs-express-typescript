import { RoutableFunction, ExpressFunction, Context, InjectableFunction } from './interface/common-interfaces';

export default function makeExpressRoute(callback?: RoutableFunction, beforeCallback?: InjectableFunction, afterCallback?: InjectableFunction): ExpressFunction {
    return async (req, res) => {
        if (callback === undefined) {
            res.status(500).send({ error: "No routing function defined"});
            return;
        }

        let context: Context = {
            request: {
                body: req.body,
                query: req.query,
                params: req.params,
                headers: {
                    'Content-Type': req.get('Content-Type'),
                    Referer: req.get('referer'),
                    'User-Agent': req.get('User-Agent')
                }
            },
            additional: {}
        }
        try {

            if (beforeCallback) {
                await beforeCallback(context);
            }

            await callback(context);

            if (afterCallback) {
                await afterCallback(context);
            }

            if (context.response !== undefined) {
                if (context.response.headers !== undefined) {
                    res.set(context.response.headers);
                }
                res.type('json');
                res.status(context.response.statusCode).send(context.response.body);    
            } else {
                res.status(500).send({ error: `a response of a context is undefined`});
            }
        } catch (e) {
            res.status(500).send({ error: `${e.message}`});
        }
    };
}

