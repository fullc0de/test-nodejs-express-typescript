import { Users } from '../model/users';
import FacebookHelper from '../helper/facebook-helper';
import { FacebookUserInfo } from '../helper/facebook-helper';
import { UserCredential, CredentialServiceType } from '../model/user-credential';
import jwt from 'jsonwebtoken';
import { Connection } from 'typeorm';
import { UseCaseError, UseCaseErrorCode } from './usecase-errors';

export interface UserAdditionalInfo {
    address: string
}

export class RegisterUser {

    private connection: Connection;

    constructor(conn: Connection) {
        this.connection = conn;
    }

    public async register(facebookToken: string, firstName: string, lastName: string, additional?: UserAdditionalInfo): Promise<Users> {
        const privateKey: string | undefined = process.env.JWT_TOKEN_SECRET;
        if (privateKey == null) {
            throw new UseCaseError(UseCaseErrorCode.InvalidParameter, "Absence of a secret key");
        }

        let info: FacebookUserInfo;
        try {
            const helper = new FacebookHelper("v5.0", facebookToken);
            info = await helper.user();
        } catch(e) {
            throw new UseCaseError(UseCaseErrorCode.InvalidParameter, "failed to validate a facebook token");
        }

        const duplicated = await this.connection
            .getRepository(UserCredential)
            .findOne({ serviceType: CredentialServiceType.FACEBOOK, userServiceId: info.id });
        if (duplicated) {
            throw new UseCaseError(UseCaseErrorCode.Duplicate, "already signed up");
        }

        const user = new Users();
        user.firstName = firstName;
        user.lastName = lastName;
        if (additional?.address) {
            user.address = additional.address;
        }

        try {
            await this.connection.transaction(async entityManager => {
                await entityManager.save(user);
        
                var token = jwt.sign({ userId: user.id }, privateKey);
        
                const credential = new UserCredential();
                credential.serviceType = CredentialServiceType.FACEBOOK;
                credential.userServiceId = info.id!;
                credential.authToken = token;
                credential.user = user;
                await entityManager.save(credential);
            });

        } catch(e) {
            throw new UseCaseError(UseCaseErrorCode.TransactionFailed, `transaction error on creating user: ${e}`);
        }

        return this.connection
            .getRepository(Users)
            .findOneOrFail(user.id, { relations: ["credential"] });
    }
}