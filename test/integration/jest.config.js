const {join} = require('path');

module.exports = {
    preset: 'ts-jest',
    testMatch: ['<rootDir>/test/integration/**/*.test.ts'],
    rootDir: join(__dirname, '../../'),
    testEnvironment: 'node',
};
