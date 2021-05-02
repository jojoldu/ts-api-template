// eslint-disable-next-line node/no-missing-require
require('ts-node/register');
const {resolve} = require('path');
const ts_preset = require('ts-jest/jest-preset');
// const testcontainers_preset = require('@trendyol/jest-testcontainers/jest-preset');

// module.exports = Object.assign(ts_preset, testcontainers_preset, {
//     testEnvironment: resolve(__dirname, './postgresql.environment.ts'),
// });

module.exports = {
    clearMocks: true,
    maxWorkers: 1,
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: [
        '<rootDir>/test/**/*.test.ts',
        '!<rootDir>/test/testConnections.ts',
    ],
};
