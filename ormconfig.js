const {PrivateSnakeNamingStrategy} = require("./config/PrivateSnakeNamingStrategy");

module.exports = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "test",
    password: "test",
    database: "test",
    synchronize: true,
    logging: false,
    dropSchema: true,
    entities: [
        "src/entity/**/*.ts"
    ],
    migrations: [
        'src/migration/**/*.ts'
    ],
    subscribers: [
        'src/subscriber/**/*.ts'
    ],
    cli: {
        "entitiesDir": "src/entity",
        "migrationsDir": "src/migration",
        "subscribersDir": "src/subscriber"
    },
    namingStrategy: new PrivateSnakeNamingStrategy(),
}
