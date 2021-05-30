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

        // for (const entity of entities) {
        //     await getConnection().query(`ALTER TABLE ${entity.tableName} DISABLE TRIGGER ALL`);
        // }

        for (const entity of entities) {

            // const repository = connection.getRepository(entity.name);
            // await repository.clear();
            await getConnection().query(`TRUNCATE TABLE ${entity.tableName} CASCADE`);
        }
        // await getConnection().query(`ALTER TABLE ${entity.tableName} ENABLE TRIGGER ALL`);
    },
};

export default testConnection;
