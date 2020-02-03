
interface ParamDict<T> { [key: string]: T };

interface HttpRequest {
    readonly body: {}
    readonly query: string
    readonly params: ParamDict<string>
    readonly headers: ParamDict<string>
};

interface HttpResponse {
    headers?: {}
    statusCode: number
    body: string | {}
};

interface Context {
    request: HttpRequest
    response?: HttpResponse
    additional: ParamDict<any>
}

type ExpressFunction = (req: any, res: any) => void;
type RoutableFunction = (ctx: Context) => Promise<void>;
type InjectableFunction = (ctx: Context) => Promise<void>;

export {
    ParamDict,
    HttpRequest,
    HttpResponse,
    Context,
    ExpressFunction,
    RoutableFunction,
    InjectableFunction
}