import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Rating } from "./Rating.js";
import { IUser } from "./IUser.js";

@Entity()
export class User implements IUser {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 128 })
    username: string;

    @Column({ unique: true, length: 128 })
    email: string;

    @Column({ length: 128 })
    password: string;

    @OneToMany(() => Rating, (rating) => rating.user)
    ratings: Rating[];
}
