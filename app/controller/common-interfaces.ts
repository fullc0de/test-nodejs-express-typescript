
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

type RoutableFunction = (request: HttpRequest) => Promise<HttpResponse>;

export {
    ParamDict,
    HttpRequest,
    HttpResponse,
    RoutableFunction
}