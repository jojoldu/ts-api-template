import {Article} from "./Article";
import {EntityRepository, Repository} from "typeorm";

@EntityRepository(Article)
export class ArticleRepository extends Repository<Article> {

    findOneByTitle(title: string) {
        return this.findOne({title});
    }

}
