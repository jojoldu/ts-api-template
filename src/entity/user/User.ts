import {Column, Entity} from "typeorm";
import {BaseTimeEntity} from "../BaseTimeEntity";

@Entity()
export class User extends BaseTimeEntity {

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    isActive: boolean;

    constructor() {
        super();
    }

    static signup(name: string, email: string) {
        const user = new User();
        user.name = name;
        user.email = email;
        user.activate();
    }

    deactivate(): void {
        this.isActive = false;
    }

    activate(): void {
        this.isActive = true;
    }
}
