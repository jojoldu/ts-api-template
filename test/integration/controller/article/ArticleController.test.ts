import { getCustomRepository } from "typeorm";
import { ArticleController } from "../../../../src/controller/ArticleController";
import { ArticleRepository } from "../../../../src/entity/article/ArticleRepository";
import { ArticleQueryRepository } from "../../../../src/entity/article/ArticleQueryRepository";
import testConnection from "../../testConnection";
import { ArticleService } from "../../../../src/service/article/ArticleService";
import { ArticleCreateDto } from "../../../../src/service/article/dto/ArticleCreateDto";

describe('ArticleController CRUD', () => {
    let articleRepository: ArticleRepository;
    let articleQueryRepository: ArticleQueryRepository;
    let articleService: ArticleService;
    let articleController:ArticleController;

    beforeAll(async () => {
        await testConnection.create();
        articleRepository = getCustomRepository(ArticleRepository);
        articleQueryRepository = getCustomRepository(ArticleQueryRepository);
        articleService = new ArticleService(articleQueryRepository);
        articleController = new ArticleController(articleService);
    });

    afterAll(async () => {
        await testConnection.close();
    });

    afterEach(async () => {
        await testConnection.clear();
    });

    test('ArticleController create', async () => {
        // given
        const now = new Date();
        const targetTitle = '테스트';

        // when
        const id = await articleController.create(
            new ArticleCreateDto(now, targetTitle, '테스트데이터', 'jojoldu'),
            null);

        // then
        expect(Number(id)).toBeGreaterThanOrEqual(1);
        const result = await articleRepository.findOne({title: targetTitle});
        expect(result.title).toBe(targetTitle);
    })
})
