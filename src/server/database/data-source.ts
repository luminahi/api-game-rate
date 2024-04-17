import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import { Rating } from "./entities/Rating.js";
import { User } from "./entities/User.js";
import { Game } from "./entities/Game.js";

const dataSource: DataSourceOptions = {
    type: "sqlite",
    database: "database.sqlite",
    synchronize: false,
    dropSchema: false,
    logging: true,
    entities: [Rating, User, Game],
    migrations: ["src/server/database/migrations/**/*.ts"],
    subscribers: [],
};

export const DevDataSource = new DataSource(dataSource);

export const TestDataSource = new DataSource({
    ...dataSource,
    database: ":memory:",
});

export const ProdDataSource = new DataSource(dataSource);
