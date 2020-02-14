import { Users } from '../model/users';
import FacebookHelper from '../helper/facebook-helper';
import { FacebookUserInfo } from '../helper/facebook-helper';
import { UserCredential, CredentialServiceType } from '../model/user-credential';
import jwt from 'jsonwebtoken';
import { Connection } from 'typeorm';

export interface UserAdditionalInfo {
    address: string
}

export class RegisterUser {

    private connection: Connection;

    constructor(conn: Connection) {
        this.connection = conn;
    }

    public async register(facebookToken: string, firstName: string, lastName: string, additional?: UserAdditionalInfo): Promise<Users | undefined> {
        const privateKey: string | undefined = process.env.JWT_TOKEN_SECRET;
        if (privateKey == null) {
            throw Promise.reject("Absence of a secret key");
        }

        let info: FacebookUserInfo;
        try {
            const helper = new FacebookHelper("v5.0", facebookToken);
            info = await helper.user();
        } catch(e) {
            return Promise.reject("failed to validate a facebook token");
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
                await entityManager.save(credential);
        
                user.credential = credential;
                await entityManager.save(user);
            });    
        } catch(e) {
            console.log(`transaction error on creating user: ${e}`);
            return undefined;
        }

        return user;
    }
}