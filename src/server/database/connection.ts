import {
    DevDataSource,
    ProdDataSource,
    TestDataSource,
} from "./data-source.js";

const getConnection = async () => {
    const env = process.env.NODE_ENV || "development";

    switch (env) {
        case "development":
            return await DevDataSource.initialize();
        case "test":
            await TestDataSource.initialize();
            await TestDataSource.runMigrations();
            return TestDataSource;
        case "production":
            return await ProdDataSource.initialize();
        default:
            return await DevDataSource.initialize();
    }
};

export default await getConnection();
