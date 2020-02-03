import { RoutableFunction } from "./common-interfaces";


export interface ControllerInterface {
    // get '/'
    index?: RoutableFunction;

    // get '/:id'
    show?: RoutableFunction;

    // put ':id'
    put?: RoutableFunction;

    // post '/'
    post?: RoutableFunction;

    // delete ':id'
    delete?: RoutableFunction;
};