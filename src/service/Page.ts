export class Page<T> {
    constructor(
        public readonly totalCount: number,
        public readonly pageSize: number,
        public readonly items: T[],
    ) {}

    get totalPage(): number {
        return Math.ceil(this.totalCount / this.pageSize);
    }
}
