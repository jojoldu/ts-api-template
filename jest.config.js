module.exports = {
    moduleFileExtensions: ['js', 'json', 'ts'],
    testPathIgnorePatterns: [
        "<rootDir>/node_modules/"
    ],
    testMatch: [
        '<rootDir>/test/unit/**/*.test.ts',
        '<rootDir>/test/config/**/*.test.ts',
        '<rootDir>/test/integration/**/*.test.ts',
    ],
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
    },
    collectCoverageFrom: [
        'src/**/*.ts',
        '!src/app.ts',
        '!src/start.ts',
        '!src/**/*.config.ts',
        '!src/**/entity/**',
        '!src/**/exception/**',
    ],
    coverageDirectory: 'coverage',
    testEnvironment: 'node'
};
