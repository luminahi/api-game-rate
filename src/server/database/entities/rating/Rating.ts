import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../user/User.js";
import { Game } from "../game/Game.js";

@Entity({ name: "user_game" })
export class Rating {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    rating: number;

    @ManyToOne(() => User, (user) => user.ratings, { eager: true })
    user: User;

    @ManyToOne(() => Game, (game) => game.ratings, { eager: true })
    game: Game;
}
