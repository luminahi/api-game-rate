import { QueryFailedError } from "typeorm";
import connection from "../../connection.js";
import { Game } from "../../entities/game/Game.js";
import { Result } from "../../../shared/util/Result.js";

const patchById = async (
    id: number,
    game: Game
): Promise<Result<number | null>> => {
    try {
        const repository = connection.getRepository(Game);

        const { affected } = await repository.update({ id }, { ...game });
        if (!affected)
            return Result.asFailure(400, `game ${id} could not be patched`);

        return Result.wrap(affected);
    } catch (err: unknown) {
        if (err instanceof QueryFailedError) {
            console.error(err.message);
            return Result.asFailure(500, err.message);
        }

        return Result.asFailure(500, "internal error");
    }
};

export { patchById };
