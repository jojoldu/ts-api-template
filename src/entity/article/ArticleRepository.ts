import {Article} from "./Article";
import {EntityRepository, Repository} from "typeorm";
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
/**
 * CREATE / UPDATE / DELETE
 */
@EntityRepository(Article)
export class ArticleRepository extends BaseRepository<Article> {

    findOneByTitle(title: string) {
        return this.findOne({title});
    }

}
