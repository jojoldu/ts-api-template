import { EntityRepository, Repository } from "typeorm";
import { User } from "./User";

/**
 * CREATE / UPDATE / DELETE
 */
@EntityRepository(User)
export class UserRepository extends Repository<User> {

    findOneByName(name: string) {
        return this.findOne({name});
    }

}
