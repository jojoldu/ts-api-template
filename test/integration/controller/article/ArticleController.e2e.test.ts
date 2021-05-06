import { ArticleCreateDto } from "../../../../src/service/article/dto/ArticleCreateDto";

const app = require('../../../../src/app');
const request = require('supertest');

describe('ArticleController HTTP Request', () => {

    test('ArticleController Http create', async () => {
        // given
        const now = new Date();
        const targetTitle = '테스트';
        const reqDto = new ArticleCreateDto(now, targetTitle, '테스트데이터', 'jojoldu');

        // when
        const userRes = await request(app)
            .post('/api/article')
            .send(reqDto);

        // then
        expect(userRes.body.data).toBeGreaterThanOrEqual(1);
    })
})

