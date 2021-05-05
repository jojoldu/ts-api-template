import {Article} from "./Article";
import {createQueryBuilder, EntityRepository} from "typeorm";

/**
 * Read
 */
@EntityRepository(Article)
export class ArticleQueryRepository {

    findOneById(id: number) {
        return createQueryBuilder()
            .select("article")
            .from(Article, "article")
            .where("article.id = :id", { id: id })
            .getOne();
    }

    findOneByTitle(title: string) {
        return createQueryBuilder()
            .select("article")
            .from(Article, "article")
            .where("article.title = :title", { title: title })
            .getOne();
    }

}
