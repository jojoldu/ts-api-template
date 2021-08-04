import {Service} from "typedi";
import {InjectRepository} from "typeorm-typedi-extensions";
import {ArticleQueryRepository} from "../../repository/article/ArticleQueryRepository";
import {ArticleCreateParam} from "./dto/ArticleCreateParam";
import {EntityManager, Transaction, TransactionManager} from "typeorm";
import logger from "../../config/logger";

@Service()
export class ArticleTransactionService {
    constructor(
        @InjectRepository() private articleQueryRepository: ArticleQueryRepository,
        ) {}

    @Transaction()
    async createTransaction(
        articleCreateDto: ArticleCreateParam,
        isError: boolean,
        @TransactionManager() manager?: EntityManager
    ): Promise<number> {
        logger.info(JSON.stringify(articleCreateDto));
        const article = await manager.save(articleCreateDto.toEntity(null));
        if(isError) {
            throw new Error('Exception으로 인해 롤백된다');
        }
        return article.id;
    }

    @Transaction()
    async publishTransaction(
        id: number,
        isError: boolean,
        @TransactionManager() manager?: EntityManager
    ): Promise<void> {
        const article = await this.articleQueryRepository.findOneById(id);
        article.publish();
        await manager.save(article);
        if(isError) {
            throw new Error('Exception으로 인해 롤백된다');
        }
    }

}
