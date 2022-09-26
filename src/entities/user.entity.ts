import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"
import { Exclude } from "class-transformer";
import { v4 as uuid } from "uuid"

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', {length: 50, nullable: false})
    first_name: string;

    @Column('varchar', {length: 50, nullable: false})
    last_name: string;

    @Column('varchar', {length: 50, nullable: false})
    email: string;

    @Column('varchar', {length: 50, nullable: false})
    @Exclude()
    password: string;

    constructor() {
        if (!this.id) {
            this.id = uuid()
        }
    }
}