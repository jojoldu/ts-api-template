import { getCustomRepository, getRepository } from "typeorm";
import { Article } from "../../../../src/entity/article/Article";
import { ArticleRepository } from "../../../../src/entity/article/ArticleRepository";
import { ArticleQueryRepository } from "../../../../src/repository/article/ArticleQueryRepository";
import { testConnection } from "../../../testConnection";

describe("Article CRUD", () => {

    afterEach(async () => {
        await testConnection.clear();
    });

    it("Article publish on", async () => {
        // given
        const now = new Date();
        const targetTitle = "테스트";
        const article = Article.create(now, targetTitle, "테스트데이터", null);
        const articleRepository = getRepository(Article);
        await articleRepository.save(article);

        // when
        let savedArticle = await articleRepository.findOne({ title: targetTitle });
        savedArticle.publish();
        await articleRepository.save(savedArticle);

        // then
        const result = await articleRepository.findOne({ title: targetTitle });
        expect(result.isPublished).toBe(true);
    });

    it("custom repository test", async () => {
        // given
        const now = new Date();
        const targetTitle = "테스트";
        const article = Article.create(now, targetTitle, "테스트데이터", null);
        let articleRepository = getCustomRepository(ArticleRepository);
        await articleRepository.save(article);

        // when
        let savedArticle = await articleRepository.findOneByTitle(targetTitle);

        // then
        expect(savedArticle.title).toBe(targetTitle);
    });

    it("custom repository test2", async () => {
        // given
        const now = new Date();
        const targetTitle = "테스트";
        const article = Article.create(now, targetTitle, "테스트데이터", null);
        const articleRepository = getCustomRepository(ArticleRepository);
        const articleQueryRepository = getCustomRepository(ArticleQueryRepository);
        await articleRepository.save(article);

        // when
        let savedArticle = await articleQueryRepository.findOneByTitle(targetTitle);

        // then
        expect(savedArticle.title).toBe(targetTitle);
    });

    it("Detach Entity의 id 타입은 bigint 으로 사용된다", async () => {
        // given
        const now = new Date();
        const targetTitle = "테스트";

        // when
        const noEntity = Article.create(now, targetTitle, "테스트데이터", null);
        noEntity.id = 1n;

        // then
        expect(typeof noEntity.id).toBe("bigint");
        expect(noEntity.id + BigInt(1)).toBeGreaterThanOrEqual(1n);
    });

    it("Attach Entity의 id 타입은 bigint 으로 사용된다", async () => {
        // given
        const now = new Date();
        const targetTitle = "테스트";
        const articleRepository = getCustomRepository(ArticleRepository);

        // when
        const entity = await articleRepository.save(Article.create(now, targetTitle, "테스트데이터", null));

        // then
        expect(typeof entity.id).toBe("bigint");
        expect(entity.id + BigInt(1)).toBeGreaterThanOrEqual(1n);
    });

    it("Select Entity의 id 타입은 bigint 으로 사용된다", async () => {
        // given
        const now = new Date();
        const targetTitle = "테스트";
        const articleRepository = getCustomRepository(ArticleRepository);

        // when
        await articleRepository.save(Article.create(now, targetTitle, "테스트데이터", null));
        const select = await articleRepository.findOne({ title: targetTitle });

        // then
        expect(typeof select.id).toBe("bigint");
        expect(select.id + BigInt(1)).toBeGreaterThanOrEqual(1n);
    });
});



