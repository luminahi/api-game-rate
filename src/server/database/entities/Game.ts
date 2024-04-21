import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { IGame } from "./IGame.js";
import { Rating } from "./Rating.js";

@Entity()
export class Game implements IGame {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 128, unique: true })
    name: string;

    @Column({ default: false })
    isDeleted: boolean;

    @OneToMany(() => Rating, (rating) => rating.game)
    ratings: Rating[];
}
