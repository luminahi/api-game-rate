import { QueryFailedError } from "typeorm";
import connection from "../../connection.js";
import { Rating } from "../../entities/rating/Rating.js";

const patchById = async (id: number, rating: number): Promise<void> => {
    try {
        const repository = connection.getRepository(Rating);

        await repository.update({ id }, { rating });
    } catch (err: unknown) {
        if (err instanceof QueryFailedError) {
            console.error(err.message);
        }
    }
};

export { patchById };
