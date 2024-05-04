import { QueryFailedError } from "typeorm";
import connection from "../../connection.js";
import { Rating } from "../../entities/rating/Rating.js";

const deleteById = async (id: number): Promise<void> => {
    try {
        const repository = connection.getRepository(Rating);

        await repository.delete({ id });
    } catch (err: unknown) {
        if (err instanceof QueryFailedError) {
            console.error(err.message);
        }
    }
};

export { deleteById };
