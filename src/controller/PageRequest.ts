export abstract class PageRequest {
    pageNo: number| 1;
    pageSize: number| 10;

    getOffset(): number {
        return (this.pageNo-1) * this.pageSize;
    }

    getLimit(): number {
        return this.pageSize;
    }

    getLimitWithNext(): number {
        return this.pageSize + 1;
    }
}
