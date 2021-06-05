export class Page<T> {
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

    static createByManyAndCount(manyAndCount, pageSize) {
        return new Page(manyAndCount.get(1), pageSize, manyAndCount.get(0));
    }
}
