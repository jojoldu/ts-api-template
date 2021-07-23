import { getConnection, getConnectionManager } from "typeorm";
import { createDatabaseConnection } from "../src/config/database";

export const testConnection = {
    async create() {
        if(this.hasNotDefaultConnection()) {
            await createDatabaseConnection();
            await this.clear();
        }
    },

    async close() {
        if(this.hasDefaultConnection()) {
            await getConnection().close();

        }
    },

    hasNotDefaultConnection() {
        return !this.hasDefaultConnection();
    },

    hasDefaultConnection() {
        return getConnectionManager().has("default");
    },

    async clear() {
        const connection = getConnection();
        const entities = connection.entityMetadatas;

        await Promise.all(entities.map(e => this.deleteAll(e.name)));
    },

    async deleteAll(entityName: string) {
        const connection = getConnection();
        const repository = connection.getRepository(entityName);
        return repository.clear();
    }
}

