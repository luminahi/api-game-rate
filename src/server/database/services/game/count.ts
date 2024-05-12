import { QueryFailedError } from "typeorm";
import connection from "../../connection.js";
import { Game } from "../../entities/game/Game.js";
import { Result } from "../../../shared/util/Result.js";

const count = async (): Promise<Result<number | null>> => {
    try {
        const repository = connection.getRepository(Game);

        const count = await repository.count({ where: { isDeleted: false } });

        if (typeof count != "number")
            return Result.asFailure(500, "game could not be counted");

        return Result.wrap(count);
    } catch (err: unknown) {
        if (err instanceof QueryFailedError) {
            console.error(err.message);
            return Result.asFailure(500, err.message);
        }

        return Result.asFailure(500, "internal error");
    }
};

export { count };
