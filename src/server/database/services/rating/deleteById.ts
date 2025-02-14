import { QueryFailedError } from "typeorm";
import connection from "../../connection.js";
import { Rating } from "../../entities/rating/Rating.js";
import { Result } from "../../../shared/util/Result.js";

const deleteById = async (id: number): Promise<Result<number | null>> => {
    try {
        const repository = connection.getRepository(Rating);

        const { affected } = await repository.delete({ id });
        if (!affected)
            return Result.asFailure(400, `element ${id} could not be deleted`);

        return Result.wrap(affected);
    } catch (err: unknown) {
        if (err instanceof QueryFailedError) {
            console.error(err.message);
            return Result.asFailure(500, err.message);
        }

        return Result.asFailure(500, "internal error");
    }
};

export { deleteById };
