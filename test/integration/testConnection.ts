import { createConnection, getConnection, getConnectionManager } from "typeorm";
import {createDatabaseConnection} from "../../src/config/database";

const testConnection = {
    async create(){
        await createDatabaseConnection();
    },

    async close(){
        await getConnection().close();
    },

    async clear(){
        const connection = getConnection();
        const entities = connection.entityMetadatas;

        for (const entity of entities) {
            await getConnection().createEntityManager()
                .query(`ALTER TABLE ${entity.tableName} DISABLE TRIGGER ALL`);

            const repository = connection.getRepository(entity.name);
            await repository.clear();

            await getConnection().createEntityManager()
                .query(`ALTER TABLE ${entity.tableName} ENABLE TRIGGER ALL`);
        }
    },
};
export default testConnection;
