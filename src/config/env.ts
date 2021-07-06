/**
 * NODE_ENV에 따른 .env.test 파일을 로드한다.
 */

import * as path from "path";

const config = require("dotenv").config({
    path: path.join(__dirname, `../../env/.env.${process.env.NODE_ENV || "test"}`),
});

if (config.error) {
    throw config.error
}

/**
 * 환경 변수
 */
export const env = {
    database: {
        host: process.env.TYPEORM_HOST,
        port: Number(process.env.TYPEORM_PORT),
        username: process.env.TYPEORM_USERNAME,
        password: process.env.TYPEORM_PASSWORD,
        database: process.env.TYPEORM_DATABASE,
        synchronize: process.env.TYPEORM_SYNCHRONIZE === "true",
        logging: process.env.TYPEORM_LOGGING === "true",
        dropSchema: process.env.TYPEORM_DROP_SCHEMA === "true"
    },
};
