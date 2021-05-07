import { App } from "./app";

try {
    const app = new App().app;
    const port = 4000;

    app.listen(port, () => {
        console.info(`Server is running on http://localhost:${port}`);
    });
} catch (error) {
    console.error(error);
}
