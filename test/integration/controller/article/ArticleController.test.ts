import { ArticleCreateDto } from "../../../../src/service/article/dto/ArticleCreateDto";
import { App } from "../../../../src/app";
import testConnection from "../../testConnection";

const request = require('supertest');

describe('ArticleController HTTP Request', () => {
    let app;

    beforeAll(async ()=>{
        app = new App().app;
        await testConnection.create();
    });

    afterAll(async ()=>{
        app = null;
        await testConnection.close();
    });

    afterEach(async () => {
        await testConnection.clear();
    });

    test('ArticleController Http get', async () => {
        // when
        const res = await request(app)
            .get('/api/article')
            .send();

        // then
        console.log(JSON.stringify(res.text));
        expect(res.status).toBe(200);
    })

    test('ArticleController Http create', async () => {
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
        expect(res.body.data).toBeGreaterThanOrEqual(1);
    })
})

