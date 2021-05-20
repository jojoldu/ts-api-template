require('pinpoint-node-agent');

import { App } from "./app";
import 'pinpoint-node-agent'

try {
    const app = new App().app;
    const port = 4000;

    app.listen(port, () => {
        console.info(`Server is running on http://localhost:${port}`);
    });
} catch (error) {
    console.error(error);
}

