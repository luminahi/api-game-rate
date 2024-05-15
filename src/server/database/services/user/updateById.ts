import { QueryFailedError } from "typeorm";
import connection from "../../connection.js";
import { User } from "../../entities/user/User.js";
import { hashPassword } from "../../../shared/util/passwordUtil.js";
import { Result } from "../../../shared/util/Result.js";

const updateById = async (
    id: number,
    user: User
): Promise<Result<number | null>> => {
    try {
        const repository = connection.getRepository(User);

        user.password = await hashPassword(user.password);
        const { affected } = await repository.update({ id }, user);

        if (!affected)
            return Result.asFailure(400, `element ${id} could not be updated`);

        return Result.wrap(affected);
    } catch (err: unknown) {
        if (err instanceof QueryFailedError) {
            console.error(err.message);
            return Result.asFailure(500, err.message);
        }

        if (err instanceof Error) {
            console.error(err.message);
            throw err;
        }

        return Result.asFailure(500, "internal error");
    }
};

export { updateById };
