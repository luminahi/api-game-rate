import { QueryFailedError } from "typeorm";
import connection from "../../connection.js";
import { Rating } from "../../entities/rating/Rating.js";
import { Result } from "../../../shared/util/Result.js";
import { User } from "../../entities/user/User.js";

const patchById = async (
    ratingId: number,
    user: User,
    rating: number
): Promise<Result<number | null>> => {
    try {
        const repository = connection.getRepository(Rating);

        const { affected } = await repository.update(
            { id: ratingId, user },
            { rating }
        );

        if (!affected)
            return Result.asFailure(
                400,
                `rating ${ratingId} could not be patched`
            );

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
