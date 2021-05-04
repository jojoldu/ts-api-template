import {Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

export abstract class BaseTimeEntity {

    @PrimaryGeneratedColumn({type: 'bigint'})
    id: number;

    @CreateDateColumn({type:"timestamptz"})
    createdAt: Date;

    @UpdateDateColumn({type:"timestamptz"})
    updatedAt: Date;

    @Column({type:"timestamptz", nullable: true})
    deletedAt?: Date | null;

}
