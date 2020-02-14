import { Entity, Column } from 'typeorm';
import { CommonEntity } from './common-entity';

export enum CredentialServiceType {
    FACEBOOK = "facebook_service_id",
    GOOGLE = "google_service_id"
}

@Entity()
export class UserCredential extends CommonEntity {

    @Column({
        type: "enum",
        enum: CredentialServiceType,
        default: CredentialServiceType.FACEBOOK
    })
    public serviceType!: CredentialServiceType;

    @Column()
    public userServiceId!: string;

    @Column()
    public authToken!: string;
}