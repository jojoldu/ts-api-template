import {Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import { BigintValueTransformer } from "./BigintValueTransformer";

export abstract class BaseTimeEntity {

    @PrimaryGeneratedColumn({type: 'bigint'})
    @Column({transformer: new BigintValueTransformer()})
    id: bigint;

    @CreateDateColumn({type:"timestamptz"})
    createdAt: Date;

    @UpdateDateColumn({type:"timestamptz"})
    updatedAt: Date;

    @Column({type:"timestamptz", nullable: true})
    deletedAt?: Date | null;

}
