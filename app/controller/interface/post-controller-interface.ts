import {HttpRequest, HttpResponse} from "../interfaces";

export default interface PostControllerInterface {
    // v1 ~
    index?(request: HttpRequest): Promise<HttpResponse>
    show?(request: HttpRequest): Promise<HttpResponse>
}
