import { getCustomRepository } from "typeorm";
import { testConnection } from "../../testConnection";
import { Article } from "../../../src/entity/article/Article";
import { ArticleRepository } from "../../../src/entity/article/ArticleRepository";
import { ArticleQueryRepository } from "../../../src/repository/article/ArticleQueryRepository";
import { ArticleSearchParam } from "../../../src/repository/article/dto/ArticleSearchParam";
import { UserRepository } from "../../../src/entity/user/UserRepository";
import { User } from "../../../src/entity/user/User";
import { ArticleSearchRequest } from "../../../src/controller/article/dto/ArticleSearchRequest";

describe('Article 조회 테스트', () => {
    let articleRepository: ArticleRepository;
    let articleQueryRepository: ArticleQueryRepository;
    let userRepository: UserRepository;

    beforeAll(async () => {
        await testConnection.create();
    });

    afterAll(async () => {
        await testConnection.close();
    });

    beforeEach(async () => {
        articleRepository = getCustomRepository(ArticleRepository);
        articleQueryRepository = getCustomRepository(ArticleQueryRepository);
        userRepository = getCustomRepository(UserRepository);
    });

    afterEach(async () => {
        await testConnection.clear();
    });

    it('동적 쿼리 테스트', async () => {
        // given
        const now = new Date();
        const targetTitle = '테스트';
        const article = Article.create(now, targetTitle, '테스트데이터', null);
        await articleRepository.save(article);
        await articleRepository.save(Article.create(now, '', '테스트데이터', null));

        const dto = new ArticleSearchParam(targetTitle, null, null, null);

        // when
        const articlesAndCount = await articleQueryRepository.dynamicQueryByDto(dto);
        const entities = articlesAndCount[0];
        const count = articlesAndCount[1];

        // then
        expect(articlesAndCount).toHaveLength(2);
        expect(entities).toHaveLength(1);
        expect(count).toBe(1);
    })

    it('join 조회', async () => {
        // given
        const now = new Date();
        const userName = "userName";
        const user = await userRepository.save(User.signup(userName, "jojoldu@gmail.com"));

        const articleTitle = '테스트';
        const article = await articleRepository.save(Article.create(now, articleTitle, '테스트데이터', user));

        // when
        const titleAndName = await articleQueryRepository.getTitleAndUserName(article.id);

        // then
        expect(titleAndName.title).toBe(articleTitle);
        expect(titleAndName.userName).toBe(userName);
    })

    it("paging + ilike ", async () => {
        const now = new Date();
        const title = 'Test';
        const content = '테스트데이터';
        const article = Article.create(now, title, content, null);
        await articleRepository.save(article);

        //when
        const result = await articleQueryRepository.paging(ArticleSearchRequest.create(now, 'test', 1, 10));
        const entities = result[0];
        const count = result[1];

        //then
        expect(entities).toHaveLength(1);
        expect(entities[0].title).toBe(title);
        expect(count).toBe(1);
    });

    it("pagingWithoutCount에서는 pageSize가 2개여도 +1 개가 되어 조회된다", async () => {
        // given
        const now = new Date();
        const title = 'Test';
        const content = '테스트데이터';

        await articleRepository.save(Article.create(now, title, content, null));
        await articleRepository.save(Article.create(now, title, content, null));
        await articleRepository.save(Article.create(now, title, content, null));

        const pageSize = 2;
        const param = ArticleSearchRequest.create(now, 'test', 1, pageSize);

        //when
        const entities = await articleQueryRepository.pagingWithoutCount(param);

        //then
        expect(entities).toHaveLength(pageSize + 1);
    });
})



