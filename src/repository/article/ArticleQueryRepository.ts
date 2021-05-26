import {Article} from "../../entity/article/Article";
import {createQueryBuilder, EntityRepository} from "typeorm";
import { ArticleSearchDto } from "./dto/ArticleSearchDto";

/**
 * Read
 */
@EntityRepository(Article)
export class ArticleQueryRepository {

    findAll () {
        return createQueryBuilder()
            .select("article")
            .from(Article, "article")
            .getMany();
    }

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

    pagingByDto (dto: ArticleSearchDto) {
        const queryBuilder = createQueryBuilder()
            .select("article")
            .from(Article, "article")
            .orderBy("article.id", "DESC");

        if(dto.title) {
            queryBuilder.andWhere("article.title = :title", {title: dto.title})
        }

        if(dto.author) {
            queryBuilder.andWhere("article.author = :author", {author: dto.author})
        }

        return queryBuilder
            .disableEscaping()
            .getManyAndCount();
    }
}
