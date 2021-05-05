import {Article} from "./Article";
import {EntityRepository, Repository} from "typeorm";
/**
 * CREATE / UPDATE / DELETE
 */
@EntityRepository(Article)
export class ArticleRepository extends Repository<Article> {

    findOneByTitle(title: string) {
        return this.findOne({title});
    }

}
