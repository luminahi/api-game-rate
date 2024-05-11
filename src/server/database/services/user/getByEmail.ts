import { QueryFailedError } from "typeorm";
import connection from "../../connection.js";
import { User } from "../../entities/user/User.js";
import { Result } from "../../../shared/util/Result.js";

const getByEmail = async (email: string): Promise<Result<User | null>> => {
    try {
        const repository = connection.getRepository(User);
        const result = await repository.findOne({
            where: { email },
        });

        if (!result)
            return Result.asFailure(404, `user with id '${email}' not found`);

        return Result.wrap(result);
    } catch (err: unknown) {
        if (err instanceof QueryFailedError) {
            console.error(err.message);
            return Result.asFailure(500, err.message);
        }

        return Result.asFailure(500, "internal error");
    }
};

export { getByEmail };
