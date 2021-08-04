import { Column, CreateDateColumn, Generated, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { BigintValueTransformer } from "./BigintValueTransformer";

export abstract class BaseTimeEntity {

    @Generated("increment")
    @PrimaryColumn({type: 'bigint', transformer: new BigintValueTransformer()})
    id: number;

    @CreateDateColumn({type:"timestamptz"})
    createdAt: Date;

    @UpdateDateColumn({type:"timestamptz"})
    updatedAt: Date;

    @Column({type:"timestamptz", nullable: true})
    deletedAt?: Date | null;

}
