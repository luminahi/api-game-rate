import { AppDataSource } from "./data-source.js";

const getConnection = () => {
    return AppDataSource.initialize();
};

export default await getConnection();
