# TypeORM에서 페이징 사용하기




```javascript
export abstract class WebPageRequest {
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
export class WebPageResponse<T> {
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
    paging(param: CouponSearchParam){
        const queryBuilder = createQueryBuilder()
            .select("coupon") // select 는 Entity 대신에 Dto
            .from(Coupon, "coupon");

        /**
         * 동적쿼리
         */
        return queryBuilder
            .limit(param.getLimit())
            .offset(param.getOffset())
            .getManyAndCount()
    }
```

## 테스트

```javascript
describe('ApiPageResponseDto', () => {
    it.each([
        [10, 10, 1],
        [11, 10, 2],
        [20, 10, 2],
        [9, 10, 1],
        [0, 10, 0],
    ])('totalCount=%i, pageSize=%i 이면 totalPage=%i', (totalCount, pageSize, expected) => {
        expect(new WebPageResponse(totalCount, pageSize, []).totalPage).toBe(expected);
    })

})
```

## 마무리

페이징은 성능 이슈가 심하기 때문에, 결과적으로 운영 환경의 데이터가 많아지면 많아질수록 다른 방식으로 개선해야만 하는데요.  

* [1. NoOffset 사용하기](https://jojoldu.tistory.com/528)
* [2. 커버링 인덱스 사용하기](https://jojoldu.tistory.com/529)
* [3-1. 페이지 건수 고정하기](https://jojoldu.tistory.com/530)
* [3-2. 첫 페이지 조회 결과 cache 하기](https://jojoldu.tistory.com/531)


