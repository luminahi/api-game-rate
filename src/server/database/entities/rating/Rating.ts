import {
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    Unique,
} from "typeorm";
import { User } from "../user/User.js";
import { Game } from "../game/Game.js";
import { IRating } from "./IRating.js";
import { Max, Min } from "class-validator";

@Unique("unique_rate", ["user", "game"])
@Entity({ name: "user_game" })
export class Rating implements IRating {
    @PrimaryGeneratedColumn()
    id: number;

    @Max(10)
    @Min(0)
    @Column()
    rating: number;

    @ManyToOne(() => User, (user) => user.ratings, { eager: true })
    user: User;

    @ManyToOne(() => Game, (game) => game.ratings, { eager: true })
    game: Game;
}
