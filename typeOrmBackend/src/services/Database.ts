import {
    createConnection,
    getCustomRepository,
    getManager,
    EntityManager
} from "typeorm";
import { TeamCustomRepository } from '../repository/TeamCustomRepository';
import { UserCustomRepository } from '../repository/UserCustomRepository';
import { PlayerCustomRepository } from '../repository/PlayerCustomRepository';

export default class Database {

    public static manager: EntityManager;

    public static async createConnection() {
        console.log("Connecting to DB...");
        await createConnection();
        Database.manager = getManager();
        console.log("DB connected.");
    }

    public static getTeamCustomRepository() {
        if (Database.TeamRepository == null) {
            Database.TeamRepository = getCustomRepository(TeamCustomRepository);
        }
        return Database.TeamRepository;
    }

    public static getUserCustomRepository() {
        if (Database.UserRepository == null) {
            Database.UserRepository = getCustomRepository(UserCustomRepository);
        }
        return Database.UserRepository;
    }

    public static getPlayerCustomRepository() {
        if (Database.PlayerRepository == null) {
            Database.PlayerRepository = getCustomRepository(PlayerCustomRepository);
        }
        return Database.PlayerRepository;
    }

    private static TeamRepository: TeamCustomRepository;
    private static UserRepository: UserCustomRepository;
    private static PlayerRepository: PlayerCustomRepository;
}
