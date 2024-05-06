import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import { Rating } from "./entities/rating/Rating.js";
import { User } from "./entities/user/User.js";
import { Game } from "./entities/game/Game.js";
import path from "path";
import { fileURLToPath } from "url";

const getCurrentPath = () => path.dirname(fileURLToPath(import.meta.url));

const devDataSource: DataSourceOptions = {
    type: "sqlite",
    database: path.resolve("database.sqlite"),
    synchronize: false,
    dropSchema: false,
    logging: true,
    entities: [Rating, User, Game],
    migrations: [path.join(getCurrentPath(), "migrations") + "/*.{ts,js}"],
    subscribers: [],
};

const testDataSource: DataSourceOptions = {
    ...devDataSource,
    database: ":memory:",
    synchronize: true,
    logging: false,
};

function getDataSourceOptions() {
    const env = process.env.NODE_ENV || "development";

    switch (env) {
        case "development":
            return devDataSource;
        case "test":
            return testDataSource;
        default:
            return devDataSource;
    }
}

export default new DataSource(getDataSourceOptions());
