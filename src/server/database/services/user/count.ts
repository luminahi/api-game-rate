import { QueryFailedError } from "typeorm";
import connection from "../../connection.js";
import { User } from "../../entities/user/User.js";
import { Result } from "../../../shared/util/Result.js";

const count = async (): Promise<Result<number | null>> => {
    try {
        const repository = connection.getRepository(User);

        const count = await repository.count();

        if (typeof count != "number")
            return Result.asFailure(500, "could not be counted");

        return Result.wrap(count);
    } catch (err: unknown) {
        if (err instanceof QueryFailedError) {
            console.error(err.message);
            return Result.asFailure(500, err.message);
        }

        return Result.asFailure(500, "internal error");
    }
};

export { count };
