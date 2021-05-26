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

    findAllByDto (dto: ArticleSearchDto) {
        return createQueryBuilder()
            .select("article")
            .from(Article, "article")
            .andWhere(this.eqTitle(dto.title))
            .andWhere(this.eqAuthor(dto.author))
            .orderBy("article.id desc")
            .getMany();
    }

    private eqTitle(title: string): string {
        if(!title) {
            return null;
        }

        return `article.title = :${title}`;
    }

    private eqAuthor(author: string): string {
        if(!author) {
            return null;
        }

        return `article.author = :${author}`;
    }

}
