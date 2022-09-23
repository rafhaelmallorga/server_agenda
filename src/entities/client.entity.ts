import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Contact } from "./contact.entity";
import { v4 as uuid } from 'uuid'

@Entity()
export class Client {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', {length: 50, nullable: false, unique: true})
    full_name: string;

    @Column('varchar', {length: 50, nullable: false, unique: true})
    email: string;

    @Column('varchar', {length: 50, nullable: false})
    phone: string;

    @Column()
    created_at: Date;

    @OneToMany(() => Contact, (contact) => contact.client)
    contacts: Contact[]

    constructor() {
        if (!this.id) {
            this.id = uuid()
        }
    }
}