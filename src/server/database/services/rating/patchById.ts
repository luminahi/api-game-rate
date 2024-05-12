import { QueryFailedError } from "typeorm";
import connection from "../../connection.js";
import { Rating } from "../../entities/rating/Rating.js";
import { Result } from "../../../shared/util/Result.js";

const patchById = async (
    id: number,
    rating: number
): Promise<Result<number | null>> => {
    try {
        const repository = connection.getRepository(Rating);

        const { affected } = await repository.update({ id }, { rating });
        if (!affected)
            return Result.asFailure(400, `rating ${id} could not be patched`);

        return Result.wrap(affected);
    } catch (err: unknown) {
        if (err instanceof QueryFailedError) {
            console.error(err.message);
            return Result.asFailure(500, err.message);
        }

        return Result.asFailure(500, "internal error");
    }
};

export { patchById };
