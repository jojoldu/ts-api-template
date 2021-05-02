const {join} = require('path');

module.exports = {
    preset: 'ts-jest',
    clearMocks: true,
    maxWorkers: 1,
    maxConcurrency: 1,
    testMatch: [
        '<rootDir>/test/integration/**/*.test.ts',
        '!<rootDir>/test/integration/testConnection.ts'
    ],
    rootDir: join(__dirname, '../../../'),
    testEnvironment: 'node',
};
