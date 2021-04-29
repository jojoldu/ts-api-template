import {createDatabaseConnection} from "./database";

export class App {

    constructor() {
        App.setDatabase();
    }

    private static async setDatabase(): Promise<void> {
        try {
            await createDatabaseConnection();
        } catch (error) {
            console.log(error);
        }
    }
}
