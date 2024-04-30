import { QueryFailedError } from "typeorm";
import connection from "../../connection.js";
import { Rating } from "../../entities/rating/Rating.js";
import { gameService } from "../../services/game/index.js";
import { userService } from "../../services/user/index.js";

const create = async (
    rating: number,
    gameId: number,
    userId: number
): Promise<Rating | null> => {
    try {
        const repository = connection.getRepository(Rating);

        const game = await gameService.getById(gameId);
        const user = await userService.getById(userId);

        if (!game || !user) return null;

        const newRating = new Rating();
        newRating.game = game;
        newRating.user = user;
        newRating.rating = rating;

        //TODO
        return await repository.save(newRating);
    } catch (err: unknown) {
        if (err instanceof QueryFailedError) {
            console.error(err.message);
        }

        return null;
    }
};

export { create };
