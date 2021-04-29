import {createConnection, getConnection} from 'typeorm';
import {createDatabaseConnection} from "../../src/database";

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
            const repository = connection.getRepository(entity.name);
            await repository.query(`DELETE FROM ${entity.tableName}`);
        }
    },
};
export default testConnection;
