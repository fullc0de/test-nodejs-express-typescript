import { Entity, Column, ManyToMany } from 'typeorm';
import { CommonEntity } from './common-entity';
import { Foo } from './foo';

@Entity()
export class Bar extends CommonEntity {

    @Column({nullable: true})
    public barName!: string;

    @ManyToMany(type => Foo, foo => foo.bars)
    public foos!: Foo[];

}