// dto는 모두 private으로 막는다
export class ArticleSearchParam {
    private readonly _title: string;
    private readonly _content: string;
    private readonly _author: string;
    private readonly _reservationDate: Date;

    constructor(title: string, content: string, author: string, reservationDate: Date) {
        this._title = title;
        this._content = content;
        this._author = author;
        this._reservationDate = reservationDate;
    }

    get title(): string {
        return this._title;
    }

    get content(): string {
        return this._content;
    }

    get author(): string {
        return this._author;
    }

    get reservationDate(): Date {
        return this._reservationDate;
    }
}
