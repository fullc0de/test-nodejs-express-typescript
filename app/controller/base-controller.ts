import validator from 'validator';
import { Users } from "../model";
import FacebookHelper from '../helper/facebook-helper';

export default abstract class BaseController {
    public superName: string = 'super';

    public validateParamId(id: string): number | Error {
        if (!validator.isInt(id)) {
            return new Error(`invalid resource parameter (${id})`);
        }
        return +id;
    }

    public async currentUser(token: string): Promise<Users | undefined> {
        const helper = new FacebookHelper('v5.0', 'EAAJ9boVcoZBkBACowZA6VDyUJZAsmr73uQdqlG6LfWBT4wZB1BK18EGsETscnWrMw05KP4oulYaZB2JZACKZB4708fDMpM8tVtV4TpyOJdDkzSypgvWwuikRx1imE30HHlfAZBUytOzdu76ZCNMswdva7z3IQPlZCHFWoCmnoDAGZCatAZDZD');
        const info = await helper.user();
        if (info.id == null) {
            return undefined;
        } else {
            return await Users.findOne(1);
        }
    }
}
