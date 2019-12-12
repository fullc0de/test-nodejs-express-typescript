
export interface ParamDict<T> { [key: string]: T }

export interface HttpRequest {
    readonly body: {}
    readonly query: string
    readonly params: ParamDict<string>
    readonly headers: {}
}

export interface HttpResponse {
    headers?: {}
    statusCode: number
    body: string | {}
}

