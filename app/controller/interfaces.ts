
export interface ParamDict<T> { [key: string]: T }

export interface HttpRequest {
    body: {}
    query: string
    params: ParamDict<string>
    headers: {}
}

export interface HttpResponse {
    headers: {}
    statusCode: number
    body: string | {}
}
