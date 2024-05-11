import { QueryFailedError } from "typeorm";
import connection from "../../connection.js";
import { Rating } from "../../entities/rating/Rating.js";
import { Result } from "../../../shared/util/Result.js";

const getAll = async (): Promise<Result<Rating[] | null>> => {
    try {
        const repository = connection.getRepository(Rating);

        const builder = repository.createQueryBuilder();
        const ratings: Rating[] = await builder
            .select("rating")
            .addSelect("User.username", "user")
            .addSelect("Game.name", "game")
            .leftJoin("game", "Game", "gameId = Game.id")
            .leftJoin("user", "User", "userId = User.id")
            .execute();

        if (!ratings) return Result.asFailure(404, "there is no elements");

        return Result.wrap(ratings);
    } catch (err: unknown) {
        if (err instanceof QueryFailedError) {
            console.error(err.message);
            return Result.asFailure(500, err.message);
        }

        return Result.asFailure(500, "internal error");
    }
};

export { getAll };
