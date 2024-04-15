import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Rating } from "./Rating.js";
import { IUser } from "./IUser.js";

@Entity()
export class User implements IUser {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column({ length: 128 })
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Rating, (rating) => rating.user)
    ratings: Rating[];
}
