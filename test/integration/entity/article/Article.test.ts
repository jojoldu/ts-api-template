import {getRepository} from "typeorm";
import {Article} from "../../../../src/entity/article/Article";
import testConnection from "../../testConnection";

describe('Article CRUD', () => {

    beforeAll(async ()=>{
        await testConnection.create();
    });

    afterAll(async ()=>{
        await testConnection.close();
    });

    afterEach(async () => {
        await testConnection.clear();
    });


    test('Article 생성', async () => {
        const now = new Date();
        const article = Article.create(now, '테스트', '테스트데이터', 'jojoldu');

        let articleRepository = getRepository(Article);
        await articleRepository.save(article);
        let savedArticles = await articleRepository.find();
        console.log("All articles from the db: ", savedArticles);
    })

    test('Article publish on', async () => {
        // given
        const now = new Date();
        const targetTitle = '테스트';
        const article = Article.create(now, targetTitle, '테스트데이터', 'jojoldu');
        let articleRepository = getRepository(Article);
        await articleRepository.save(article);

        // when
        let savedArticle = await articleRepository.findOne({title:targetTitle});
        savedArticle.publish();
        await articleRepository.save(savedArticle);

        // then
        const result = await articleRepository.findOne({title:targetTitle});
        expect(result.isPublished).toBe(true);
    })

})



