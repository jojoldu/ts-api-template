import {Article} from "../../../../src/entity/article/Article";

describe('Article 기본 CRUD', () => {
    test('팩토리 메소드로 생성', () => {
        const now = new Date();
        const author = 'jojoldu';
        const article = Article.create(now, '테스트', '테스트데이터', author);

        expect(article.reservationDate).toBe(now);
        expect(article.author).toBe(author);
    });
});
