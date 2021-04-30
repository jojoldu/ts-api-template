
import testConnection from '../../testConnection';
import {getConnection, getRepository} from "typeorm";
import {Article} from "../../../../src/entity/article/Article";

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
    const article = Article.create(now, '테스트', '테스트데이터', 'jojoldu');

    let articleRepository = getConnection().getRepository(Article);
    await articleRepository.save(article);
    let savedArticles = await articleRepository.find();
    console.log("All articles from the db: ", savedArticles);
})

it('테스트1', async () => {
    const now = new Date();
    const article = Article.create(now, '테스트', '테스트데이터', 'jojoldu');

    let articleRepository = getRepository(Article);
    await articleRepository.save(article);
    let savedArticles = await articleRepository.find();
    console.log("All articles from the db: ", savedArticles);
})


