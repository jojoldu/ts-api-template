import {Column, Entity} from "typeorm";
import {BaseTimeEntity} from "../BaseTimeEntity";

@Entity()
export class Article extends BaseTimeEntity{

    @Column({type:"timestamptz", nullable: true})
    public reservationDate: Date;

    @Column()
    public title: string;

    @Column({type: "text"})
    public content: string;

    @Column()
    public author: string;

    @Column({type:'bigint'})
    public views: number;

    @Column()
    public isPublished: boolean;

    static create(reservationDate: Date, title: string, content: string, author: string) {
        let article = new Article();
        article.reservationDate = reservationDate;
        article.title = title;
        article.content = content;
        article.author = author;
        article.views = 1;
        article.isPublished = false;
        return article;
    }

    publish(): void {
        this.isPublished = true;
    }

    updateContent(reservationDate: Date, title: string, content: string): void {
        this.reservationDate = reservationDate;
        this.title = title;
        this.content = content;
    }

}
