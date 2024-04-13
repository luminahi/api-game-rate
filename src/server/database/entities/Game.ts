import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Game {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 128, unique: true })
    name: string;
}
