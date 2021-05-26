import { getCustomRepository } from "typeorm";
import testConnection from "../testConnection";
import { Article } from "../../../src/entity/article/Article";
import { ArticleRepository } from "../../../src/entity/article/ArticleRepository";
import { ArticleQueryRepository } from "../../../src/repository/article/ArticleQueryRepository";
import { ArticleSearchDto } from "../../../src/repository/article/dto/ArticleSearchDto";

describe('Article 조회 테스트', () => {
    let articleRepository: ArticleRepository;
    let articleQueryRepository: ArticleQueryRepository;

    beforeEach(async () => {
        articleRepository = getCustomRepository(ArticleRepository);
        articleQueryRepository = getCustomRepository(ArticleQueryRepository);
    });

    afterEach(async () => {
        await testConnection.clear();
    });

    test('동적 쿼리 테스트', async () => {
        // given
        const now = new Date();
        const targetTitle = '테스트';
        const article = Article.create(now, targetTitle, '테스트데이터', 'jojoldu');
        await articleRepository.save(article);
        await articleRepository.save(Article.create(now, '', '테스트데이터', 'jojoldu'));

        const dto = new ArticleSearchDto(targetTitle, null, null, null);

        // when
        const articlesAndCount = await articleQueryRepository.pagingByDto(dto);
        const entities = articlesAndCount[0];
        const count = articlesAndCount[1];

        // then
        expect(articlesAndCount).toHaveLength(2);
        expect(entities).toHaveLength(1);
        expect(count).toBe(1);
    })

})



