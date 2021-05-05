import {Service} from "typedi";
import {InjectRepository} from "typeorm-typedi-extensions";
import {ArticleQueryRepository} from "../../entity/article/ArticleQueryRepository";
import {ArticleCreateDto} from "./dto/ArticleCreateDto";
import {EntityManager, Transaction, TransactionManager} from "typeorm";

@Service()
export class ArticleTransactionService {
    constructor(
        @InjectRepository() private articleQueryRepository: ArticleQueryRepository,
        ) {}

    @Transaction()
    async createTransaction(
        articleCreateDto: ArticleCreateDto,
        isError: boolean,
        @TransactionManager() manager?: EntityManager
    ): Promise<Number> {
        console.log(articleCreateDto);
        const article = await manager.save(articleCreateDto.toEntity());
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
