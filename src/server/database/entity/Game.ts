import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Game {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 128, nullable: true })
    name: string;

    @Column()
    rating: number;
}
