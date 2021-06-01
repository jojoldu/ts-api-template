import {Article} from "../../entity/article/Article";
import {createQueryBuilder, EntityRepository} from "typeorm";
import { ArticleSearchDto } from "./dto/ArticleSearchDto";
import { ArticleSearchRequest } from "../../controller/article/dto/ArticleSearchRequest";

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

    dynamicQueryByDto (dto: ArticleSearchDto) {
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

    getTitleAndUserName(articleId: number) {
        return createQueryBuilder()
            .select("article.title", "title")
            .addSelect("user.name", "userName")
            .from(Article, "article")
            .innerJoin("article.user", "user", "user.isActive = :isActive", {isActive: true})
            .where("article.id = :id", {id:articleId})
            .getRawOne();
    }

    paging(param: ArticleSearchRequest){
        const queryBuilder = createQueryBuilder()
            .select("article") // select 는 Entity 대신에 Dto
            .from(Article, "article");

        /**
         * 동적쿼리
         */
        if(param.hasReservationDate()) {
            queryBuilder.andWhere("article.reservationDate >= :reservationDate", {reservationDate: param.reservationDate})
        }

        if(param.hasTitle()) {
            queryBuilder.andWhere("article.title ilike %:title%", {title: param.title});
        }

        return queryBuilder
            .limit(param.getLimit())
            .offset(param.getOffset())
            .getManyAndCount()
    }
}
