export class PageWithoutCount<T> {
    pageSize: number;
    isNext: boolean;
    items: T[];

    constructor(pageSize: number, items: T[]) {
        this.pageSize = pageSize;
        this.setNext(items);
        this.setItems(items);
    }

    private setNext(items: T[]): void {
        this.isNext = items.length >= this.pageSize;
    }

    private setItems(items: T[]) {
        this.items = items;

        if(items.length > this.pageSize) {
            items.pop();
            this.items = items;
        }
    }
}
