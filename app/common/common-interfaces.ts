import { Response, Request } from "express";

interface ParamDict<T> { [key: string]: T };

interface HttpRequest {
    readonly body: {}
    readonly query: string
    readonly params: ParamDict<string>
    readonly headers: {}
};

interface HttpResponse {
    headers?: {}
    statusCode: number
    body: string | {}
};

interface Context {
    request: HttpRequest
    response?: HttpResponse
    userId?: number
}

type ExpressFunction = (req: Request, res: Response) => void;
type RoutableFunction = (ctx: Context) => Promise<void>;

export {
    ParamDict,
    HttpRequest,
    HttpResponse,
    Context,
    ExpressFunction,
    RoutableFunction
}