import 'reflect-metadata';
import { initializeTransactionalContext } from 'typeorm-transactional-cls-hooked';
import Container from "typedi";
import { createConnection, ConnectionOptions, useContainer } from "typeorm";
import { env } from "./env";
import {SnakeNamingStrategy} from "typeorm-naming-strategies";

export async function createDatabaseConnection(): Promise<void> {
    try {
        const connectionOption: ConnectionOptions = {
            type: "postgres",
            host: env.database.host,
            port: env.database.port,
            username: env.database.username,
            password: env.database.password,
            database: env.database.name,
            synchronize: env.database.synchronize,
            logging: env.database.logging,
            dropSchema: env.database.dropSchema,
            entities: [
                "src/entity/**/*.ts"
            ],
            migrations: [
                'src/migration/**/*.ts'
            ],
            subscribers: [
                'src/subscriber/**/*.ts'
            ],
            cli: {
                "entitiesDir": "src/entity",
                "migrationsDir": "src/migration",
                "subscribersDir": "src/subscriber"
            },
            namingStrategy: new SnakeNamingStrategy(),
        };
        initializeTransactionalContext();
        useContainer(Container);
        await createConnection(connectionOption);
    } catch (error) {
        throw error;
    }
}
