import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Client } from "./client.entity";
import { v4 as uuid } from 'uuid'

@Entity()
export class Contact {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', {length: 50, nullable: false})
    full_name: string;

    @Column('varchar', {length: 50, nullable: false})
    email: string;

    @Column('varchar', {length: 50, nullable: false})
    phone: string;

    @ManyToOne(()=>Client, (client)=>client.contacts)
    client: Client

    constructor() {
        if (!this.id) {
            this.id = uuid()
        }
    }
}