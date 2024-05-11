import { QueryFailedError } from "typeorm";
import connection from "../../connection.js";
import { Rating } from "../../entities/rating/Rating.js";
import { Result } from "../../../shared/util/Result.js";

const getById = async (id: number): Promise<Result<Rating | null>> => {
    try {
        const repository = connection.getRepository(Rating);
        const builder = repository.createQueryBuilder();

        const queryResult = await builder
            .select("rating")
            .addSelect("User.username", "user")
            .addSelect("Game.name", "game")
            .leftJoin("game", "Game", "gameId = Game.id")
            .leftJoin("user", "User", "userId = User.id")
            .where({ id })
            .execute();

        const rating = repository.create(queryResult)[0];

        if (!rating)
            return Result.asFailure(404, `rating with id '${id}' not found`);

        return Result.wrap(rating);
    } catch (err: unknown) {
        if (err instanceof QueryFailedError) {
            console.error(err.message);
            return Result.asFailure(500, err.message);
        }

        return Result.asFailure(500, "internal error");
    }
};

export { getById };
