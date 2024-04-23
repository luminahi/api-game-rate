import { QueryFailedError } from "typeorm";
import connection from "../../connection.js";
import { User } from "../../entities/User.js";

const count = async (): Promise<number> => {
    try {
        const repository = connection.getRepository(User);

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
