import { User } from "../model";
import FacebookHelper from '../helper/facebook-helper';

export default abstract class BaseController {
    public validateParamId(id: string): number | Error {
        const converted = +id;
        if (Number.isNaN(converted)) {
            return new Error(`invalid resource parameter (${id})`);
        }
        return converted;
    }

    public async currentUser(token: string): Promise<User | undefined> {
        const helper = new FacebookHelper('v5.0', 'EAAJ9boVcoZBkBACowZA6VDyUJZAsmr73uQdqlG6LfWBT4wZB1BK18EGsETscnWrMw05KP4oulYaZB2JZACKZB4708fDMpM8tVtV4TpyOJdDkzSypgvWwuikRx1imE30HHlfAZBUytOzdu76ZCNMswdva7z3IQPlZCHFWoCmnoDAGZCatAZDZD');
        const info = await helper.user();
        if (info.id == null) {
            return undefined;
        } else {
            return await User.findOne(1);
        }
    }
}
