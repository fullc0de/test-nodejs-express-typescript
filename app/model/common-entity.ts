import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, VersionColumn, BaseEntity } from 'typeorm';

export class CommonEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id!: number;

    @CreateDateColumn()
    public createdAt!: Date;

    @UpdateDateColumn()
    public updatedAt!: Date;

    @VersionColumn()
    public version!: number;

}