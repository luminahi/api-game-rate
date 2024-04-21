import dataSource from "./data-source.js";

async function getConnection() {
    return dataSource.initialize();
}

export default await getConnection();
