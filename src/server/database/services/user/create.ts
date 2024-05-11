import { QueryFailedError } from "typeorm";
import connection from "../../connection.js";
import { User } from "../../entities/user/User.js";
import { hashPassword } from "../../../shared/util/passwordUtil.js";
import { Result } from "../../../shared/util/Result.js";

const create = async (user: User): Promise<Result<User | null>> => {
    try {
        const repository = connection.getRepository(User);

        const newUser = new User();
        newUser.username = user.username;
        newUser.email = user.email;
        newUser.password = await hashPassword(user.password);

        const result = await repository.save(newUser);
        if (!result) return Result.asFailure(500, "could not be saved");

        return Result.wrap(result);
    } catch (err: unknown) {
        if (err instanceof QueryFailedError) {
            console.error(err.message);
            return Result.asFailure(500, err.message);
        }

        return Result.asFailure(500, "internal error");
    }
};

export { create };
