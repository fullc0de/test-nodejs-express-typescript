import {HttpRequest, HttpResponse} from "./interfaces";

export class PostController {

    public async index(request: HttpRequest): Promise<HttpResponse> {
        return {
            headers: { "Hello": "World" },
            statusCode: 200,
            body: { message: "wow success!" }
        }
    }

    public async show(request: HttpRequest): Promise<HttpResponse> {
        const params = request.params
        return {
            headers: { "Hello": "World" },
            statusCode: 200,
            body: {
                id: params.id,
                author: "J. K. Rolling",
                title: "Harry Potter"
            }
        }
    }
}
