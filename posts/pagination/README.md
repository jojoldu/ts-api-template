# TypeORM에서 페이징 API 만들기


> 전체 코드는 [Github](https://github.com/jojoldu/ts-api-template)에 있습니다.


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
        .from(Article, "article")
        .limit(param.getLimit())
        .offset(param.getOffset())

    /**
    * 동적쿼리
    */
    if(param.hasReservationDate()) {
        queryBuilder.andWhere("article.reservationDate >= :reservationDate", {reservationDate: param.reservationDate})
    }

    if(param.hasTitle()) {
        queryBuilder.andWhere("article.title ilike :title", {title: `%${param.title}%`});
    }

    return queryBuilder.getManyAndCount()
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

## Paging Without Count


이렇게 API 인터페이스를 구현하면 이후엔 [더보기 방식](https://jojoldu.tistory.com/528) (```No Offset / Without Offset```) 으로 구성하기가 편해집니다.  
  
현재 테이블의 데이터가 수십만건 밖에 되지 않는다면 굳이 더보기 방식을 선택할 필요는 없으니 무리하게 변경할 필요는 없습니다.

## 마무리

이번 글에서 소개한 내용들은 모두 기본적인 페이징 방식을 이야기하는데요.  
  
페이징은 성능 이슈가 심하기 때문에, 결과적으로 운영 환경의 데이터가 많아지면 많아질수록 다른 방식으로 개선해야만 합니다.  
  
그럴땐 아래 글들을 참고해보시면 좋습니다.  
모두 고성능의 페이징 API를 구현 하는 방법을 Java & JPA & Querydsl로 소개하였는데요.  
지금 사용하고 있는 개발 환경과 다르더라도 **컨셉 자체는 그대로 사용하시면** 되기 때문에 어떤 컨셉인지 한번쯤은 익히고 가시면 이후 시스템 확장이나 데이터 증가에 대응하실때 많은 도움이 될 수 있습니다.

* [1. NoOffset 사용하기](https://jojoldu.tistory.com/528)
* [2. 커버링 인덱스 사용하기](https://jojoldu.tistory.com/529)
* [3-1. 페이지 건수 고정하기](https://jojoldu.tistory.com/530)
* [3-2. 첫 페이지 조회 결과 cache 하기](https://jojoldu.tistory.com/531)


