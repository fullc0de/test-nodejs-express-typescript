import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, VersionColumn, BaseEntity } from 'typeorm';

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id: number = 0

    @Column({nullable: true})
    public firstName: string = ''

    @Column({nullable: true})
    public lastName: string = ''

    @CreateDateColumn()
    public createdAt: Date = new Date();

    @UpdateDateColumn()
    public updatedAt: Date = new Date();

    @VersionColumn()
    public version: number = 0;
}
