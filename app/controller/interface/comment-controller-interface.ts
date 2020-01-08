import {RoutableFunction} from "../common-interfaces";

export default interface CommentControllerInterface {
    // v1 ~
    index?: RoutableFunction;
    show?: RoutableFunction;
    postComments?: RoutableFunction;
    postComment?: RoutableFunction;

    // v2 ~
    test?: RoutableFunction;
};
