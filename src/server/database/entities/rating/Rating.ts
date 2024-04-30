import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../user/User.js";
import { Game } from "../game/Game.js";
import { IRating } from "./IRating.js";

@Entity({ name: "user_game" })
export class Rating implements IRating {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    rating: number;

    @ManyToOne(() => User, (user) => user.ratings, { eager: true })
    user: User;

    @ManyToOne(() => Game, (game) => game.ratings, { eager: true })
    game: Game;
}
