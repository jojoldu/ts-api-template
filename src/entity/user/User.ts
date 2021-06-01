import { Column, Entity, OneToMany } from "typeorm";
import {BaseTimeEntity} from "../BaseTimeEntity";
import { Article } from "../article/Article";

@Entity()
export class User extends BaseTimeEntity {

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    isActive: boolean;

    @OneToMany(type => Article, article => article.user, {lazy: true, cascade: true})
    articles: Article[];

    constructor() {
        super();
    }

    static signup(name: string, email: string): User {
        const user = new User();
        user.name = name;
        user.email = email;
        user.activate();
        return user;
    }

    deactivate(): void {
        this.isActive = false;
    }

    activate(): void {
        this.isActive = true;
    }
}
