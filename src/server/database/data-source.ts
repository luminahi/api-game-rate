import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/User.js";
import { Game } from "./entities/Game.js";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    dropSchema: true,
    logging: false,
    entities: [User, Game],
    migrations: [],
    subscribers: [],
});
