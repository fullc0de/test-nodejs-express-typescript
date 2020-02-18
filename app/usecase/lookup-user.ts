import { Connection, getConnection } from "typeorm";
import { Users } from '../model/users';
import { UseCaseError, UseCaseErrorCode } from "./usecase-errors";
import FacebookHelper, { FacebookUserInfo } from "../helper/facebook-helper";

export class LookupUser {

    private connection: Connection = getConnection();

    public async facebook(token: string): Promise<Users | undefined> {
        const privateKey: string | undefined = process.env.JWT_TOKEN_SECRET;
        if (privateKey == null) {
            throw new UseCaseError(UseCaseErrorCode.InvalidParameter, "Absence of a secret key");
        }

        let info: FacebookUserInfo;
        try {
            const helper = new FacebookHelper("v5.0", token);
            info = await helper.user();
        } catch(e) {
            throw new UseCaseError(UseCaseErrorCode.InvalidParameter, "failed to validate a facebook token");
        }

        return await this.connection
            .getRepository(Users)
            .createQueryBuilder("user")
            .leftJoin("user.credential", "credential")
            .where("credential.userServiceId = :id", { id: info.id })
            .getOne();
    }
}
