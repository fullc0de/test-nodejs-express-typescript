import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { CommonEntity } from './common-entity';
import { Bar } from './bar';

@Entity()
export class Foo extends CommonEntity {

    @Column({nullable: true})
    public fooName!: string;

    @ManyToMany(type => Bar, bar => bar.foos)
    @JoinTable()
    public bars!: Bar[];

}