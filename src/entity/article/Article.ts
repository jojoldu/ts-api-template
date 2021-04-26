import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Article {
    @PrimaryGeneratedColumn()
    private id: number;

    @Column("timestamptz")
    private created_at: Date;

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


    static createContent(created_at: Date, title: string, content: string, author: string) {
        let article = new Article();
        article.created_at = created_at;
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

    updateContent(created_at: Date, title: string, content: string): void {
        this.created_at = created_at;
        this.title = title;
        this.content = content;
    }
}
