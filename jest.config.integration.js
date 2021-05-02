
module.exports = {
    moduleFileExtensions: ['js', 'json', 'ts'],
    clearMocks: true,
    maxWorkers: 1,
    maxConcurrency: 1,
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
    },
    testMatch: [
        '<rootDir>/test/integration/**/*.test.ts',
        '!<rootDir>/test/integration/testConnection.ts'
    ],
    rootDir: './',
    testEnvironment: 'node',
};
