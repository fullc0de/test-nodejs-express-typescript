import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, VersionColumn } from 'typeorm';
import { CommonEntity } from './common-entity';

@Entity()
export class Users extends CommonEntity {

    @Column({nullable: true})
    public firstName: string = ''

    @Column({nullable: true})
    public lastName: string = ''

    @Column({nullable: true})
    public address: string = ''
}
