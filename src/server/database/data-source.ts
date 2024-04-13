import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User.js";
import { Game } from "./entity/Game.js";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    logging: false,
    entities: [User, Game],
    migrations: [],
    subscribers: [],
});
