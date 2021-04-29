import {Article} from "../../../../src/entity/article/Article";

import testConnection from '../../testConnection';
import {getConnection} from "typeorm";

beforeAll(async ()=>{
    await testConnection.create();
});

afterAll(async ()=>{
    await testConnection.close();
});

beforeEach(async () => {
    await testConnection.clear();
});

it('creates a user', async () => {
    const now = new Date();
    const article = Article.createContent(now, '테스트', '테스트데이터', 'jojoldu');

    let articleRepository = getConnection().getRepository(Article);
    await articleRepository.save(article);
    let savedArticles = await articleRepository.find();
    console.log("All articles from the db: ", savedArticles);
})
