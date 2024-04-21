import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import { Rating } from "./entities/Rating.js";
import { User } from "./entities/User.js";
import { Game } from "./entities/Game.js";

const devDataSource: DataSourceOptions = {
    type: "sqlite",
    database: "database.sqlite",
    synchronize: false,
    dropSchema: false,
    logging: true,
    entities: [Rating, User, Game],
    migrations: ["src/server/database/migrations/**/*.{ts,js}"],
    subscribers: [],
};

const testDataSource: DataSourceOptions = {
    ...devDataSource,
    database: ":memory:",
    synchronize: true,
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
