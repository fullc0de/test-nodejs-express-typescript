import { Entity, Column, JoinColumn, OneToOne } from 'typeorm';
import { CommonEntity } from './common-entity';
import { UserCredential } from './user-credential';

@Entity()
export class Users extends CommonEntity {

    @Column({nullable: true})
    public firstName!: string;

    @Column({nullable: true})
    public lastName!: string;

    @Column({nullable: true})
    public address!: string;

    @OneToOne(type => UserCredential, credential => credential.user)
    public credential!: UserCredential;
}
