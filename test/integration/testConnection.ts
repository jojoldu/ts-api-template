import { Connection, createConnection, EntityMetadata, getConnection, getConnectionManager } from "typeorm";
import { createDatabaseConnection } from "../../src/config/database";

const testConnection = {
    async create() {
        await createDatabaseConnection();
    },

    async close() {
        await getConnection().close();
    },

    async clear() {
        const connection = getConnection();
        const entities = connection.entityMetadatas;

        await Promise.all(entities.map(e => this.deleteAll(e.name)));
    },

    async deleteAll(entityName: string) {
        const connection = getConnection();
        const repository = connection.getRepository(entityName);
        const items = await repository.find();
        return repository.remove(items);
    },

};

export default testConnection;
