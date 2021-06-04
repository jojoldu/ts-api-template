# TypeORM에서 페이징 사용하기




```javascript
export abstract class PageRequest {
    pageNo: number| 1;
    pageSize: number| 10;

    getOffset(): number {
        return (this.pageNo-1) * this.pageSize;
    }

    getLimit(): number {
        return this.pageSize;
    }
}

```

```javascript
export class PageBody<T> {
    pageSize: number;
    totalCount: number;
    totalPage: number;
    items: T[];

    constructor(totalCount: number, pageSize: number, items: T[]) {
        this.pageSize = pageSize;
        this.totalCount = totalCount;
        this.totalPage = Math.ceil(totalCount/pageSize);
        this.items = items;
    }
}
```

```javascript
paging(param: ArticleSearchRequest){
    const queryBuilder = createQueryBuilder()
        .select("article") // select 는 Entity 대신에 Dto
        .from(Article, "article");

    /**
        * 동적쿼리
        */
    if(param.hasReservationDate()) {
        queryBuilder.andWhere("article.reservationDate >= :reservationDate", {reservationDate: param.reservationDate})
    }

    if(param.hasTitle()) {
        queryBuilder.andWhere("article.title ilike :title", {title: `%${param.title}%`});
    }

    return queryBuilder
        .limit(param.getLimit())
        .offset(param.getOffset())
        .getManyAndCount()
}
```

## 테스트

```javascript
describe('WebPageResponse', () => {
    it.each([
        [10, 10, 1],
        [11, 10, 2],
        [20, 10, 2],
        [9, 10, 1],
        [0, 10, 0],
    ])('totalCount=%i, pageSize=%i 이면 totalPage=%i', (totalCount, pageSize, expected) => {
        expect(new PageBody(totalCount, pageSize, []).totalPage).toBe(expected);
    })
})
```

```javascript
it("paging + ilike ", async () => {
    const now = new Date();
    const targetTitle = 'Test';
    const article = Article.create(now, targetTitle, '테스트데이터', null);
    await articleRepository.save(article);

    //when
    const result = await articleQueryRepository.paging(ArticleSearchRequest.create(now, 'test', 1, 10));
    const entities = result[0];
    const count = result[1];
    //then
    expect(entities).toHaveLength(1);
    expect(entities[0].title).toBe(targetTitle);
    expect(count).toBe(1);
});
```

## 마무리

페이징은 성능 이슈가 심하기 때문에, 결과적으로 운영 환경의 데이터가 많아지면 많아질수록 다른 방식으로 개선해야만 하는데요.  

* [1. NoOffset 사용하기](https://jojoldu.tistory.com/528)
* [2. 커버링 인덱스 사용하기](https://jojoldu.tistory.com/529)
* [3-1. 페이지 건수 고정하기](https://jojoldu.tistory.com/530)
* [3-2. 첫 페이지 조회 결과 cache 하기](https://jojoldu.tistory.com/531)


