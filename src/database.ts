import "reflect-metadata";
import Container from "typedi";
import {createConnection, useContainer} from "typeorm";

export async function createDatabaseConnection(): Promise<void> {
    try {
        useContainer(Container);
        await createConnection();
    } catch (error) {
        throw error;
    }
}
