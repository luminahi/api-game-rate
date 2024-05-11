import { QueryFailedError } from "typeorm";
import connection from "../../connection.js";
import { Rating } from "../../entities/rating/Rating.js";
import { gameService } from "../../services/game/index.js";
import { userService } from "../../services/user/index.js";
import { Result } from "../../../shared/util/Result.js";

const create = async (
    rating: number,
    gameId: number,
    userId: number
): Promise<Result<Rating | null>> => {
    try {
        const repository = connection.getRepository(Rating);

        const game = await gameService.getById(gameId);
        const user = await userService.getById(userId);

        if (!game || user.isFailure())
            return Result.asFailure(400, "game or user does not exist");

        const newRating = new Rating();
        newRating.game = game;
        newRating.user = user.unwrap();
        newRating.rating = rating;

        const result = await repository.save(newRating);
        if (!result) return Result.asFailure(500, "could not be saved");

        return Result.wrap(result);
    } catch (err: unknown) {
        if (err instanceof QueryFailedError) {
            console.error(err.message);
            return Result.asFailure(500, err.message);
        }

        return Result.asFailure(500, "internal error");
    }
};

export { create };
