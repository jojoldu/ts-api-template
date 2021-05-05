import {Service} from "typedi";
import {InjectRepository} from "typeorm-typedi-extensions";
import {ArticleRepository} from "../../entity/article/ArticleRepository";
import {ArticleQueryRepository} from "../../entity/article/ArticleQueryRepository";
import {ArticleCreateDto} from "./dto/ArticleCreateDto";
import {Transaction} from "typeorm";

@Service()
export class ArticleService {
    constructor(
        @InjectRepository() private articleRepository: ArticleRepository,
        @InjectRepository() private articleQueryRepository: ArticleQueryRepository,
        ) {}

    @Transaction()
    async create(
        articleCreateDto: ArticleCreateDto,
        isError: boolean,
    ): Promise<Number> {
        console.log(articleCreateDto);
        const article = await this.articleRepository.save(articleCreateDto.toEntity());
        if(isError) {
            throw new Error('Exception으로 롤백된다');
        }
        return article.id;
    }
}
