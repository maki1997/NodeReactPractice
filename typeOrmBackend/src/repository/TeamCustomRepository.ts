import {EntityRepository, Repository} from "typeorm";
import {Team} from "../entity/Team";

@EntityRepository(Team)
export class TeamCustomRepository extends Repository<Team> {
  // get players for specific team
  public async getPlayersOfTeam(teamId: number): Promise<Team[]> {
      return this.createQueryBuilder()
          .leftJoinAndSelect("Team.players", "players")
          .where("Team.id = :id",{id: teamId})
          .getMany();
        }
  }
