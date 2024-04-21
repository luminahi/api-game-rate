import { QueryFailedError } from "typeorm";
import connection from "../../connection.js";
import { Game } from "../../entities/Game.js";

const deleteById = async (id: number): Promise<void> => {
    try {
        const repository = connection.getRepository(Game);
        await repository.update({ id }, { isDeleted: true });
    } catch (err: unknown) {
        if (err instanceof QueryFailedError) {
            console.error(err.message);
        }
    }
};

export { deleteById };
