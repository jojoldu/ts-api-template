import { App } from "./app";

try {
    const app = new App();

    app.createExpressServer(4000);
} catch (error) {
    console.error(error);
}
