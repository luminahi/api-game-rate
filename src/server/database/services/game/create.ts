import { QueryFailedError } from "typeorm";
import connection from "../../connection.js";
import { Game } from "../../entities/Game.js";

const create = async (name: string) => {
    try {
        const game = new Game();
        game.name = name;
        return await connection.manager.save(game);
    } catch (err: unknown) {
        if (err instanceof QueryFailedError) {
            console.error("are you bobeando?");
        }
    }
};

export { create };
