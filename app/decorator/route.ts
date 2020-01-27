
export function Route(path: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log(`Registering path = ${path}, deco info: target=${target}, key=${propertyKey}`);

        target.routePath = path;
    }
}