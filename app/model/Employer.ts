import {BaseEntity, Column, Entity, PrimaryGeneratedColumn, TableInheritance} from "typeorm";

@Entity()
export class Employer extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id: number = 0

    @Column()
    public name: string = ''

    @Column()
    public title: string = ''
}
