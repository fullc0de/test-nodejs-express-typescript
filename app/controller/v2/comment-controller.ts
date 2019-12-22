import { CommentController as V1 } from "../v1/comment-controller";
import {HttpRequest, HttpResponse} from "../interfaces";
import {Employer} from "../../model/Employer";
import axios from "axios";

export class CommentController extends V1 {
    public async test(request: HttpRequest): Promise<HttpResponse> {
        let aaa = await axios.get('http://localhost:5000/wow')
        console.log(`axios response = ${aaa.data}`)

        const employer = await Employer.findOne(1)
        if (employer == undefined) {
            return {
                statusCode: 200,
                body: {}
            }
        }

        return {
            statusCode: 200,
            body: {
                id: employer.id,
                author: `${employer.name}`,
                message: "test"
            }
        }
    }
}
