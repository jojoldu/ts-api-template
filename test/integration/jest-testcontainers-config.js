module.exports = {
    postgre: {
        image: 'postgres',
        tag: 'latest',
        ports: [5432],
        env: {
            POSTGRES_DB: 'test',
            POSTGRES_USER: 'test',
            POSTGRES_PASSWORD: 'test',
        },
        wait: {
            type: 'text',
            text: 'server started',
        },
    },
};
