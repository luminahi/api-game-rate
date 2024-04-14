import { QueryFailedError } from "typeorm";
import connection from "../../connection.js";
import { Game } from "../../entities/Game.js";
import { IGame } from "../../entities/IGame.js";

const create = async (game: IGame) => {
    try {
        const newGame = new Game();
        newGame.name = game.name;
        return await connection.manager.save(newGame);
    } catch (err: unknown) {
        if (err instanceof QueryFailedError) {
            console.error("are you bobeando?");
        }
    }
};

export { create };
