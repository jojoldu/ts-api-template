import { testConnection } from "./testConnection";

process.env.NODE_ENV = "test";

beforeAll(async () => {
    console.log(`currentPath = ${process.cwd()}`)
    await testConnection.create();
});

afterAll(async () => {
    console.log(`currentPath = ${process.cwd()}`)
    await testConnection.close();
});
