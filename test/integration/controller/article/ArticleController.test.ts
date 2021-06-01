import { ArticleCreateDto } from "../../../../src/service/article/dto/ArticleCreateDto";
import { App } from "../../../../src/app";
import { getCustomRepository } from "typeorm";
import { ArticleRepository } from "../../../../src/entity/article/ArticleRepository";
import { Article } from "../../../../src/entity/article/Article";

const request = require('supertest');

describe('ArticleController HTTP Request', () => {
    let app;
    let articleRepository;

    beforeAll(async ()=>{
        app = new App().app;
        articleRepository = getCustomRepository(ArticleRepository);
    });

    afterAll(async ()=>{
        app = null;
    });

    it('get 호출시 전체 Article을 가져온다', async () => {
        // given
        const title = 'title';
        const article = Article.create(new Date(), title, 'content', null);
        articleRepository.save(article);

        // when
        const res = await request(app)
            .get('/api/article')
            .send();

        // then
        expect(res.status).toBe(200);
        expect(res.body).toHaveLength(1);
        expect(res.body[0].title).toBe(title);
    })

    it('ArticleController Http create', async () => {
        // given
        const now = new Date();
        const targetTitle = '테스트';
        const reqDto = ArticleCreateDto.create(now, targetTitle, '테스트데이터', 'jojoldu');

        // when
        const res = await request(app)
            .post('/api/article')
            .send(reqDto);

        // then
        expect(res.status).toBe(200);
        expect(res.body).toBeGreaterThanOrEqual(1);
    })
})

