import {Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

export abstract class BaseTimeEntity {

    @PrimaryGeneratedColumn({type: 'bigint'})
    protected _id: number;

    @CreateDateColumn({type:"timestamptz"}) private _createdAt: Date;

    @UpdateDateColumn({type:"timestamptz"}) private _updatedAt: Date;

    @Column({type:"timestamptz", nullable: true}) private _deletedAt?: Date | null;

    get id(): number {
        return this._id;
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    get updatedAt(): Date {
        return this._updatedAt;
    }

    get deletedAt(): Date | null {
        return this._deletedAt;
    }
}
