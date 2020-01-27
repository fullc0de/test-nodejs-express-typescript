import {RoutableFunction} from "../common-interfaces";

export default interface ControllerInterface {
    // '/'
    index?: RoutableFunction;

    // '/:id'
    show?: RoutableFunction;

    // put
    put?: RoutableFunction;

    // post
    post?: RoutableFunction;

    // delete
    delete?: RoutableFunction;
};