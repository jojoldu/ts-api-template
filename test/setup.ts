import testConnection from "./integration/testConnection";

process.env.NODE_ENV = "test";

beforeAll(async () => {
    await testConnection.create();
});

afterAll(async () => {
    await testConnection.close();
});
