import { QueryFailedError } from "typeorm";
import connection from "../../connection.js";
import { Game } from "../../entities/game/Game.js";
import { Result } from "../../../shared/util/Result.js";

const getAll = async (): Promise<Result<Game[] | null>> => {
    try {
        const repository = connection.getRepository(Game);

        const games = await repository.find({
            select: ["id", "name"],
            where: { isDeleted: false },
        });

        if (!games) throw new Error();

        return Result.wrap(games);
    } catch (err: unknown) {
        if (err instanceof QueryFailedError) {
            console.error(err.message);
            return Result.asFailure(500, err.message);
        }

        return Result.asFailure(500, "internal error");
    }
};

export { getAll };
