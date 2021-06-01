import { Column, Entity, Index, ManyToOne } from "typeorm";
import {BaseTimeEntity} from "../BaseTimeEntity";
import { User } from "../user/User";

@Entity()
@Index("idx_users_1", ["title", "reservationDate"])
export class Article extends BaseTimeEntity{

    @Column({type:"timestamptz", nullable: true})
    reservationDate: Date;

    @Column()
    title: string;

    @Column({type: "text"})
    content: string;

    @Column({type:'bigint'})
    views: number;

    @Column()
    isPublished: boolean;

    @ManyToOne(type => User, user => user.articles, {onDelete:'CASCADE'})
    user: User;

    constructor() {
        super();
    }

    static create(reservationDate: Date, title: string, content: string, user: User) {
        const article = new Article();
        article.reservationDate = reservationDate;
        article.title = title;
        article.content = content;
        article.user = user;
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
