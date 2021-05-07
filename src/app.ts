import { createDatabaseConnection } from "./config/database";
import {
    createExpressServer,
    useContainer as routingUseContainer,
    useExpressServer,
} from "routing-controllers";
import * as path from "path";
import { Container } from "typedi";
import express = require("express");
import * as bodyParser from "body-parser";

export class App {
    public app;

    constructor() {
        this.app = this.createExpress();
        this.setStaticResource();
        this.setDatabase();
        this.setMiddlewares();
    }

    private setStaticResource(): void {
        this.app.use(express.static(path.join(__dirname, "public")));
        // app.use('/', indexRouter);
    }

    /**
     * 데이터베이스를 세팅한다.
     */
    public async setDatabase(): Promise<void> {
        try {
            await createDatabaseConnection();
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * 미들웨어를 세팅한다.
     */
    private setMiddlewares(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        // this.app.use(morgan("combined", { stream }));
    }

    private createExpress() {
        try {
            routingUseContainer(Container);
            return createExpressServer({
                // cors: true,
                routePrefix: "/api",
                controllers: [`${__dirname}/../controllers/*{.ts,.js}`],
                middlewares: [`${__dirname}/../middlewares/*{.ts,.js}`],
            });
            // useSwagger(this.app);
            // useSentry(this.app);

        } catch (error) {
            console.error(error);
        }
    }
}

