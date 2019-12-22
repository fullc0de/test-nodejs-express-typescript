import {HttpRequest, HttpResponse} from "../interfaces";

export default interface CommentControllerInterface {
    // v1 ~
    index?(request: HttpRequest): Promise<HttpResponse>
    show?(request: HttpRequest): Promise<HttpResponse>
    postComments?(request: HttpRequest): Promise<HttpResponse>
    postComment?(request: HttpRequest): Promise<HttpResponse>

    // v2 ~
    test?(request: HttpRequest): Promise<HttpResponse>
}
