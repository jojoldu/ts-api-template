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