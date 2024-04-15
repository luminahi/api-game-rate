import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User.js";
import { Game } from "./Game.js";

@Entity({ name: "user_game" })
export class Rating {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    rating: number;

    @ManyToOne(() => User, (user) => user.ratings)
    user: User;

    @ManyToOne(() => Game, (game) => game.ratings)
    game: Game;
}
