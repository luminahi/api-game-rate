import dataSource from "./data-source.js";

const getConnection = async () => {
    return dataSource.initialize();
};

export default await getConnection();
