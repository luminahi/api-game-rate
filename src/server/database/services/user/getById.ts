import { QueryFailedError } from "typeorm";
import connection from "../../connection.js";
import { User } from "../../entities/User.js";

const getById = async (id: number): Promise<User | null> => {
    try {
        const repository = connection.getRepository(User);

        const result = await repository.findOne({
            where: { id },
        });
        return result;
    } catch (err: unknown) {
        if (err instanceof QueryFailedError) {
            console.error(err.message);
            return null;
        }
        return null;
    }
};

export { getById };
