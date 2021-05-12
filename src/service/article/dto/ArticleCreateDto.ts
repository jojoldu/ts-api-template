import {Article} from "../../../entity/article/Article";
import { MaxLength } from "class-validator";

export class ArticleCreateDto {
    reservationDate: Date;
    @MaxLength(200, { message: 'Title is too long', })
    title: string;
    content: string;
    author: string;

    constructor() {
    }

    static create(reservationDate: Date, title: string, content: string, author: string) {
        let dto = new ArticleCreateDto();
        dto.reservationDate = reservationDate;
        dto.title = title;
        dto.content = content;
        dto.author = author;
        return dto;
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
