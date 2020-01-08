import {RoutableFunction} from "../common-interfaces";

export default interface PostControllerInterface {
    // v1 ~
    index?: RoutableFunction;
    show?: RoutableFunction;
};
