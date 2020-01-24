
export function bind(target: any, method: any) {
    return function() {
        return method.apply(target, arguments);
    }
}    


