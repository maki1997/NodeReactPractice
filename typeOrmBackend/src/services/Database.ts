import {
    createConnection,
    getCustomRepository,
    getManager,
    EntityManager
} from "typeorm";

export default class Database {

    public static manager: EntityManager;

    public static async createConnection() {
        console.log("Connecting to DB...");
        await createConnection();
        Database.manager = getManager();
        console.log("DB connected.");
    }

}
