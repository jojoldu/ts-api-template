import { ArticleCreateParam } from "../../../../src/service/article/dto/ArticleCreateParam";
import { App } from "../../../../src/app";
import { getCustomRepository } from "typeorm";
import { ArticleRepository } from "../../../../src/entity/article/ArticleRepository";
import { Article } from "../../../../src/entity/article/Article";
import dayjs = require("dayjs");

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

    it("paging 조회", async () => {
        // given
        const title = 'title';
        const date = dayjs('2021-06-05').toDate();
        await articleRepository.save(Article.create(date, title, 'content', null));
        await articleRepository.save(Article.create(date, title, 'content', null));
        await articleRepository.save(Article.create(date, title, 'content', null));

        // when
        const res = await request(app)
            .get('/api/article/search')
            .query({pageNo: 1, pageSize: 10, reservationDate: '2021-01-10', title: title})
            .send();

        // then
        const items = res.body.items;
        expect(res.status).toBe(200);
        expect(res.body.totalCount).toBe(3);
        expect(items).toHaveLength(3);
        expect(items[0].title).toBe(title);
    });

    it("paging 더보기 조회", async () => {
        // given
        const title = 'title';
        const date = dayjs('2021-06-05').toDate();
        await articleRepository.save(Article.create(date, title, 'content', null));
        await articleRepository.save(Article.create(date, title, 'content', null));
        await articleRepository.save(Article.create(date, title, 'content', null));

        // when
        const res = await request(app)
            .get('/api/article/search-more')
            .query({pageNo: 1, pageSize: 2, reservationDate: '2021-01-10', title: title})
            .send();

        // then
        const items = res.body.items;
        expect(res.status).toBe(200);
        expect(res.body.isNext).toBeTruthy();
        expect(items).toHaveLength(2);
        expect(items[0].title).toBe(title);
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
        const reqDto = ArticleCreateParam.create(now, targetTitle, '테스트데이터', 'jojoldu');

        // when
        const res = await request(app)
            .post('/api/article')
            .send(reqDto);

        // then
        expect(res.status).toBe(200);
        expect(res.body).toBeGreaterThanOrEqual(1);
    })
})

