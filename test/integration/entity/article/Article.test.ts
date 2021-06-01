import {getCustomRepository, getRepository} from "typeorm";
import {Article} from "../../../../src/entity/article/Article";
import testConnection from "../../testConnection";
import {ArticleRepository} from "../../../../src/entity/article/ArticleRepository";
import {ArticleQueryRepository} from "../../../../src/repository/article/ArticleQueryRepository";

describe('Article CRUD', () => {

    afterEach(async () => {
        await testConnection.clear();
    });

    it('Article publish on', async () => {
        // given
        const now = new Date();
        const targetTitle = '테스트';
        const article = Article.create(now, targetTitle, '테스트데이터', null);
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

    it('custom repository test', async () => {
        // given
        const now = new Date();
        const targetTitle = '테스트';
        const article = Article.create(now, targetTitle, '테스트데이터', null);
        let articleRepository = getCustomRepository(ArticleRepository);
        await articleRepository.save(article);

        // when
        let savedArticle = await articleRepository.findOneByTitle(targetTitle);

        // then
        expect(savedArticle.title).toBe(targetTitle);
    })

    it('custom repository test2', async () => {
        // given
        const now = new Date();
        const targetTitle = '테스트';
        const article = Article.create(now, targetTitle, '테스트데이터', null);
        let articleRepository = getCustomRepository(ArticleRepository);
        let articleQueryRepository = getCustomRepository(ArticleQueryRepository);
        await articleRepository.save(article);

        // when
        let savedArticle = await articleQueryRepository.findOneByTitle(targetTitle);

        // then
        expect(savedArticle.title).toBe(targetTitle);
    })



})



