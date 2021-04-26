import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {BaseTimeEntity} from "../BaseTimeEntity";

@Entity()
export class Article extends BaseTimeEntity{
    @PrimaryGeneratedColumn()
    private id: number;

    @Column()
    private title: string;

    @Column("text")
    private content: string;

    @Column()
    private author: string;

    @Column()
    private views: number;

    @Column()
    private isPublished: boolean;

    static createContent(createdAt: Date, title: string, content: string, author: string) {
        let article = new Article();
        article.createdAt = createdAt;
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

    updateContent(createdAt: Date, title: string, content: string): void {
        this.createdAt = createdAt;
        this.title = title;
        this.content = content;
    }
}
