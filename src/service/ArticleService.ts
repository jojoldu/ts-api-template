import {Service} from "typedi";
import {InjectRepository} from "typeorm-typedi-extensions";
import {ArticleRepository} from "../entity/article/ArticleRepository";
import {Article} from "../entity/article/Article";

@Service()
export class PostService {
    constructor(@InjectRepository() private articleRepository: ArticleRepository) {}

    public async create(
    ): Promise<Article> {
        const now = new Date();
        const article = Article.createContent(now, '테스트', '테스트데이터', 'jojoldu');

        return await this.articleRepository.save(article);

    }

}
