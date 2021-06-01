export abstract class WebPageRequest {
    pageNo: number| 1;
    pageSize: number| 15;

    getOffset(): number {
        return (this.pageNo-1) * this.pageSize;
    }

    getLimit(): number {
        return this.pageSize;
    }
}
