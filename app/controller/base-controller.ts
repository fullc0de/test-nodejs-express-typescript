
export default class BaseController {
    public validateParamId(id: string): number {
        const converted = +id
        if (Number.isNaN(converted)) {
            throw new Error(`invalid resource parameter (${id})`)
        }
        return converted
    }
}
