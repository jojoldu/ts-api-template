/**
 * NODE_ENV에 따른 .env.local 파일을 로드한다.
 */
require("dotenv").config({
    path: `env/.env.${process.env.NODE_ENV || "local"}`,
});

/**
 * 환경 변수
 */
export const env = {
    database: {
        host: process.env.DATABASE_HOST,
        port: Number(process.env.DATABASE_PORT),
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        name: process.env.DATABASE_NAME,
        synchronize: process.env.TYPEORM_SYNCHRONIZE === "true",
        logging: process.env.TYPEORM_LOGGING === "true",
        dropSchema: process.env.TYPEORM_DROP_SCHEMA === "true",
    },
};
