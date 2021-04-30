const SnakeNamingStrategy = require('typeorm-naming-strategies')
    .SnakeNamingStrategy;

module.exports = {
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "test",
    "password": "test",
    "database": "test",
    "synchronize": true,
    "logging": true,
    "entities": [
        '<rootDir>/src/entity/**/*.ts'
    ],
    "migrations": [
        '<rootDir>/src/migration/**/*.ts'
    ],
    "subscribers": [
        '<rootDir>/src/subscriber/**/*.ts'
    ],
    "cli": {
        "entitiesDir": "src/entity",
        "migrationsDir": "src/migration",
        "subscribersDir": "src/subscriber"
    },
    namingStrategy: new SnakeNamingStrategy(),
}
