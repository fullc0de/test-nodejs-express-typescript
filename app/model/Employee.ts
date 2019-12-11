import {BaseEntity, Column, Entity, PrimaryGeneratedColumn, TableInheritance} from "typeorm";

@Entity()
export class Employee extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id: number = 0

    @Column()
    public name: string = ''
}
