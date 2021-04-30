import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {BaseTimeEntity} from "../BaseTimeEntity";

@Entity()
export class Article extends BaseTimeEntity{
    @PrimaryGeneratedColumn()
    private _id: number;

    @Column({type:"timestamptz", nullable: true})
    private _reservationDate: Date;

    @Column()
    private _title: string;

    @Column("text")
    private _content: string;

    @Column()
    private _author: string;

    @Column()
    private _views: number;

    @Column()
    private _isPublished: boolean;

    static create(reservationDate: Date, title: string, content: string, author: string) {
        let article = new Article();
        article._reservationDate = reservationDate;
        article._title = title;
        article._content = content;
        article._author = author;
        article._views = 1;
        article._isPublished = false;
        return article;
    }

    publish(): void {
        this._isPublished = true;
    }

    updateContent(reservationDate: Date, title: string, content: string): void {
        this._reservationDate = reservationDate;
        this._title = title;
        this._content = content;
    }

    get id(): number {
        return this._id;
    }

    get reservationDate(): Date {
        return this._reservationDate;
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

    get views(): number {
        return this._views;
    }

    get isPublished(): boolean {
        return this._isPublished;
    }
}
