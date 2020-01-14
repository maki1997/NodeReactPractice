import {EntityRepository, Repository} from "typeorm";
import {User} from "../entity/User";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    findByUsername(username) {
        return this.findOne({ username });
    }

}
