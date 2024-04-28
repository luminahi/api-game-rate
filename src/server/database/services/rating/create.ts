import { QueryFailedError } from "typeorm";
import connection from "../../connection.js";
import { Rating } from "../../entities/rating/Rating.js";

const create = async (rating: Rating): Promise<Rating | null> => {
    try {
        const repository = connection.getRepository(Rating);

        const newRating = new Rating();
        newRating.game = rating.game;
        newRating.user = rating.user;
        newRating.rating = rating.rating;

        return await repository.save(newRating);
    } catch (err: unknown) {
        if (err instanceof QueryFailedError) {
            console.error(err.message);
        }
        return null;
    }
};

export { create };
