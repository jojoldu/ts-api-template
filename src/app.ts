import {createDatabaseConnection} from "./config/database";
import {
    useContainer as routingUseContainer,
    useExpressServer,
} from "routing-controllers";
import * as path from "path";
import {Container} from "typedi";
import express = require("express");
import * as bodyParser from "body-parser";

export class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.setIndex();
        this.setDatabase();
        this.setMiddlewares();
    }

    private async setIndex(): Promise<void> {
        this.app.use(express.static(path.join(__dirname, 'public')));
        // app.use('/', indexRouter);
    }
    /**
     * 데이터베이스를 세팅한다.
     */
    private async setDatabase(): Promise<void> {
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

    /**
     * Express를 시작한다.
     * @param port 포트
     */
    public async createExpressServer(port: number): Promise<void> {
        try {
            routingUseContainer(Container);
            useExpressServer(this.app,
                {
                    cors: true,
                    routePrefix: '/api',
                    controllers: [`${__dirname}/../controllers/*{.ts,.js}`],
                    middlewares: [`${__dirname}/../middlewares/*{.ts,.js}`],
                });
            // useSwagger(this.app);
            // useSentry(this.app);

            this.app.listen(port, () => {
                console.info(`Server is running on http://localhost:${port}`);
            });
        } catch (error) {
            console.error(error);
        }
    }
}
