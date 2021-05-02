import {createConnection, getConnection} from 'typeorm';

const testConnection = {
    async create(){
        await createConnection();
    },

    async close(){
        await getConnection().close();
    },

    async clear(){
        const connection = getConnection();
        const entities = connection.entityMetadatas;

        for (const entity of entities) {
            const repository = connection.getRepository(entity.name);
            await repository.clear();
        }
    },
};
export default testConnection;
