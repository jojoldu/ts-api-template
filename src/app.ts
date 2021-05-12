import { createDatabaseConnection } from "./config/database";
import { createExpressServer, useContainer as routingUseContainer, useExpressServer } from "routing-controllers";
import * as path from "path";
import { Container } from "typedi";
import * as bodyParser from "body-parser";
import express = require("express");
import { ArticleController } from "./controller/ArticleController";

export class App {
    public app;

    constructor() {
        this.app = express();
        this.setExpress();
        this.setStaticResource();
        this.setDatabase();
        this.setMiddlewares();
    }

    private setExpress(): void {
        try {
            routingUseContainer(Container);
            useExpressServer(this.app, {
                routePrefix: "/api",
                // cors: true,
                controllers: [`${__dirname}/controller/*.ts`],
                middlewares: [`${__dirname}/middleware/*.ts`]
            });
        } catch (error) {
            console.error(error);
        }
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
        // useSwagger(this.app);
        // useSentry(this.app);
    }
}

