import {Service} from "typedi";
import {InjectRepository} from "typeorm-typedi-extensions";
import {ArticleQueryRepository} from "../../repository/article/ArticleQueryRepository";
import {ArticleCreateParam} from "./dto/ArticleCreateParam";
import {EntityManager, Transaction, TransactionManager} from "typeorm";
import { Article } from "../../entity/article/Article";
import logger from "../../config/logger";
import { ArticleSearchRequest } from "../../controller/article/dto/ArticleSearchRequest";
import { Page } from "../Page";
import { ArticleSearchItem } from "./dto/ArticleSearchItem";
import { PageWithoutCount } from "../PageWithoutCount";

@Service()
export class ArticleService {
    constructor(
        @InjectRepository() private articleQueryRepository: ArticleQueryRepository,
        ) {}

    async findAll(): Promise<Article[]> {
        return await this.articleQueryRepository.findAll();
    }

    async search(param: ArticleSearchRequest) : Promise<Page<ArticleSearchItem>>{
        const result = await this.articleQueryRepository.paging(param);
        return new Page<ArticleSearchItem>(result[1], param.pageSize, result[0].map(e => new ArticleSearchItem(e)));
    }

    async searchMore(param: ArticleSearchRequest) : Promise<PageWithoutCount<ArticleSearchItem>>{
        const result = await this.articleQueryRepository.pagingWithoutCount(param);
        return new PageWithoutCount<ArticleSearchItem>(param.pageSize, result.map(e => new ArticleSearchItem(e)));
    }

    @Transaction()
    async create(
        articleCreateDto: ArticleCreateParam,
        @TransactionManager() manager?: EntityManager
    ): Promise<Number> {
        // @ts-ignore
        const article = await manager.save(articleCreateDto.toEntity());
        return Number(article.id);
    }

    @Transaction()
    async publish(
        id: number,
        @TransactionManager() manager?: EntityManager
    ): Promise<void> {
        const article = await this.articleQueryRepository.findOneById(id);
        if(article === undefined) {
            logger.info(`ID:${id} article이 존재하지 않습니다.`);
            return ;
        }

        article.publish();
        // @ts-ignore
        await manager.save(article);
    }

}
