import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IGame } from "./IGame.js";

@Entity()
export class Game implements IGame {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 128, unique: true })
    name: string;
}
