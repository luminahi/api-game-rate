import { QueryFailedError } from "typeorm";
import connection from "../../connection.js";
import { Game } from "../../entities/game/Game.js";
import { IGame } from "../../entities/game/IGame.js";
import { Result } from "../../../shared/util/Result.js";

const create = async (game: IGame): Promise<Result<Game | null>> => {
    try {
        const repository = connection.getRepository(Game);

        const newGame = new Game();
        newGame.name = game.name;

        const result = await repository.save(newGame);
        if (!result) return Result.asFailure(500, "game could not be saved");

        return Result.wrap(result);
    } catch (err: unknown) {
        if (err instanceof QueryFailedError) {
            // console.error(err.message);
            return Result.asFailure(500, err.message);
        }

        return Result.asFailure(500, "internal error");
    }
};

export { create };
