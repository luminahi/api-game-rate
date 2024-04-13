import connection from "../../connection.js";
import { Game } from "../../entities/Game.js";

const getAll = async () => {
    return connection.manager.find(Game);
};

export { getAll };
