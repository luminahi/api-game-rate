import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable,
} from "typeorm";
import { Game } from "./Game.js";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column({ length: 128 })
    email: string;

    @Column()
    password: string;

    @ManyToMany(() => Game)
    @JoinTable()
    rating: number;
}
