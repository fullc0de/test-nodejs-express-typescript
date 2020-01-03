
export default abstract class BaseController {
    public validateParamId(id: string): number | Error {
        const converted = +id;
        if (Number.isNaN(converted)) {
            return new Error(`invalid resource parameter (${id})`);
        }
        return converted;
    }
}
