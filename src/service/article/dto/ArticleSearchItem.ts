import { Article } from "../../../entity/article/Article";

export class ArticleSearchItem {
    reservationDate: Date;
    title: string;
    content: string;

    constructor(entity: Article) {
        this.reservationDate = entity.reservationDate;
        this.title = entity.title;
        this.content = entity.content;
    }
}
