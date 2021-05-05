import testConnection from "../../testConnection";
import {Article} from "../../../../src/entity/article/Article";
import {EntityManager, getCustomRepository, getManager, getRepository} from "typeorm";
import {ArticleService} from "../../../../src/service/article/ArticleService";
import {ArticleCreateDto} from "../../../../src/service/article/dto/ArticleCreateDto";
import {ArticleRepository} from "../../../../src/entity/article/ArticleRepository";
import {ArticleQueryRepository} from "../../../../src/entity/article/ArticleQueryRepository";

describe('ArticleService CRUD', () => {
    let articleRepository: ArticleRepository;
    let articleQueryRepository: ArticleQueryRepository;
    let articleService: ArticleService;

    beforeAll(async () => {
        await testConnection.create();
        articleRepository = getCustomRepository(ArticleRepository);
        articleQueryRepository = getCustomRepository(ArticleQueryRepository);
        articleService = new ArticleService(articleRepository, articleQueryRepository);
    });

    afterAll(async () => {
        await testConnection.close();
    });

    afterEach(async () => {
        await testConnection.clear();
    });

    test('ArticleService create', async () => {
        // given
        const now = new Date();
        const targetTitle = '테스트';

        // when
        await articleService.create(
            new ArticleCreateDto(now, targetTitle, '테스트데이터', 'jojoldu'),
            false);

        // then
        const result = await articleRepository.findOne({title: targetTitle});
        expect(result.title).toBe(targetTitle);
    })
})
