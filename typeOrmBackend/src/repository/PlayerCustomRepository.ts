import {EntityRepository, Repository} from "typeorm";
import {Player} from "../entity/Player";

@EntityRepository(Player)
export class PlayerCustomRepository extends Repository<Player> {

}
