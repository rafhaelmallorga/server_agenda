import { DataSource } from "typeorm";
import "dotenv/config"
import "reflect-metadata"

export const AppDataSource = 
    process.env.NODE_ENV === 'test' ? new DataSource({
        type: 'sqlite',
        database: ':memory:',
        entities: ['src/entities/*.ts'],
        synchronize: true,
    }) 
    : new DataSource({
        type: 'postgres',
        url: process.env.DATABASE_URL,
        ssl: process.env.NODE_END === "production" ?
            {rejectUnauthorized: false}
            : false,

        synchronize: false,
        logging: true,

        entities: process.env.NODE_ENV === "production" ? ["dist/src/entities/*.js"] : ['src/entities/*.ts'],
        migrations: process.env.NODE_ENV === "production" ? ["dist/src/migrations/*.js"] : ['src/migrations/*.ts']
    })