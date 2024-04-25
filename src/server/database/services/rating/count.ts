import { QueryFailedError } from "typeorm";
import connection from "../../connection.js";
import { Rating } from "../../entities/Rating.js";

const count = async (): Promise<number> => {
    try {
        const repository = connection.getRepository(Rating);

        return await repository.count();
    } catch (err: unknown) {
        if (err instanceof QueryFailedError) {
            console.error(err.message);
            return 0;
        }
        return 0;
    }
};

export { count };
