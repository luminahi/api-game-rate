import { QueryFailedError } from "typeorm";
import connection from "../../connection.js";
import { User } from "../../entities/User.js";

const create = async (user: User): Promise<User | null> => {
    try {
        const repository = connection.getRepository(User);

        const newUser = new User();
        newUser.username = user.username;
        newUser.email = user.email;
        newUser.password = user.password;

        return await repository.save(newUser);
    } catch (err: unknown) {
        if (err instanceof QueryFailedError) {
            console.error(err.message);
        }
        return null;
    }
};

export { create };
