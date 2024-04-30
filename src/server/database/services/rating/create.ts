import { QueryFailedError } from "typeorm";
import connection from "../../connection.js";
import { Rating } from "../../entities/rating/Rating.js";
import { gameService } from "../../services/game/index.js";
import { userService } from "../../services/user/index.js";
import { Game } from "../../entities/game/Game.js";
import { User } from "../../entities/user/User.js";

const create = async (
    rating: number,
    gameId: number,
    userId: number
): Promise<Rating | null> => {
    try {
        const repository = connection.getRepository(Rating);

        const newRating = new Rating();
        newRating.game = (await gameService.getById(gameId)) as Game;
        newRating.user = (await userService.getById(userId)) as User;
        newRating.rating = rating;

        const exists = await repository.exists({
            where: { game: newRating.game, user: newRating.user },
        });

        //TODO
        return exists ? null : await repository.save(newRating);
    } catch (err: unknown) {
        if (err instanceof QueryFailedError) {
            console.error(err.message);
        }

        return null;
    }
};

export { create };
