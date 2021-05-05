import {Article} from "./Article";
import {createQueryBuilder, EntityRepository, Repository} from "typeorm";

/**
 * Read
 */
@EntityRepository(Article)
export class ArticleQueryRepository {

    findOneByTitle(title: string) {
        return createQueryBuilder()
            .select("article")
            .from(Article, "article")
            .where("article.title = :title", { title: title })
            .getOne();
    }

}
