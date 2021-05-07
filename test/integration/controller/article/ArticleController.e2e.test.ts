import { ArticleCreateDto } from "../../../../src/service/article/dto/ArticleCreateDto";
import { App } from "../../../../src/app";

const request = require('supertest');

describe('ArticleController HTTP Request', () => {
    const app = new App().app;

    test('ArticleController Http create', async () => {
        // given
        const now = new Date();
        const targetTitle = '테스트';
        const reqDto = new ArticleCreateDto(now, targetTitle, '테스트데이터', 'jojoldu');

        // when
        const res = await request(app)
            .post('/api/article')
            .send(reqDto);

        // then
        expect(res.status).toBe(200);
        expect(res.body.data).toBeGreaterThanOrEqual(1);
    })
})

