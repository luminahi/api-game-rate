import { QueryFailedError } from "typeorm";
import connection from "../../connection.js";
import { Game } from "../../entities/game/Game.js";
import { Result } from "../../../shared/util/Result.js";

const getById = async (id: number): Promise<Result<Game | null>> => {
    try {
        const repository = connection.getRepository(Game);

        const result = await repository.findOne({
            select: ["id", "name"],
            where: { id, isDeleted: false },
        });

        if (!result)
            return Result.asFailure(404, `game with id '${id}' not found`);

        return Result.wrap(result);
    } catch (err: unknown) {
        if (err instanceof QueryFailedError) {
            console.error(err.message);
            return Result.asFailure(500, err.message);
        }

        return Result.asFailure(500, "internal error");
    }
};

export { getById };
