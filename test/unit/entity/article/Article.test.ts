import {Article} from "../../../../src/entity/article/Article";

describe('Article 기본 CRUD', () => {
    it('create로 생성', () => {
        const now = new Date();
        const title = '테스트';
        const article = Article.create(now, title, '테스트데이터', null);

        expect(article.reservationDate).toBe(now);
        expect(article.title).toBe(title);
    });


});
