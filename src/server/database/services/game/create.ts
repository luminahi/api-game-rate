import { QueryFailedError } from "typeorm";
import connection from "../../connection.js";
import { Game } from "../../entities/Game.js";
import { IGame } from "../../entities/IGame.js";

const create = async (game: IGame): Promise<Game | null> => {
    try {
        const repository = connection.getRepository(Game);

        const newGame = new Game();
        newGame.name = game.name;
        newGame.isDeleted = false;

        return await repository.save(newGame);
    } catch (err: unknown) {
        if (err instanceof QueryFailedError) {
            console.error(err.message);
        }
        return null;
    }
};

export { create };
