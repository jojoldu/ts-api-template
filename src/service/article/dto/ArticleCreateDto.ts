import {Article} from "../../../entity/article/Article";

export class ArticleCreateDto {
    reservationDate: Date;
    title: string;
    content: string;
    author: string;

    constructor(reservationDate: Date, title: string, content: string, author: string) {
        this.reservationDate = reservationDate;
        this.title = title;
        this.content = content;
        this.author = author;
    }

    public toEntity(): Article {
        return Article.create(
            this.reservationDate,
            this.title,
            this.content,
            this.author
        )
    }
}
