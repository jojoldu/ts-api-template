import { Article } from "../../../entity/article/Article";
import { MinLength } from "class-validator";
import { User } from "../../../entity/user/User";

export class ArticleCreateDto {
    reservationDate: Date;
    @MinLength(1, { message: 'Title is too short', })
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

    public toEntity(user: User | null): Article {
        return Article.create(
            this.reservationDate,
            this.title,
            this.content,
            user
        )
    }
}
