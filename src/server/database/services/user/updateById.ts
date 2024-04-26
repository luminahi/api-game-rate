import { QueryFailedError } from "typeorm";
import connection from "../../connection.js";
import { User } from "../../entities/User.js";
import { hashPassword } from "../../../shared/util/passwordUtil.js";

const updateById = async (id: number, user: User): Promise<void> => {
    try {
        const repository = connection.getRepository(User);

        user.password = await hashPassword(user.password);

        await repository.update({ id }, user);
    } catch (err: unknown) {
        if (err instanceof QueryFailedError) {
            console.error(err.message);
        }
    }
};

export { updateById };
