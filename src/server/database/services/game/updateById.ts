import { QueryFailedError } from "typeorm";
import connection from "../../connection.js";
import { Game } from "../../entities/Game.js";

const updateById = async (id: number, game: Game): Promise<void> => {
    try {
        const repository = connection.getRepository(Game);

        await repository.update({ id }, game);
    } catch (err: unknown) {
        if (err instanceof QueryFailedError) {
            console.error(err.message);
        }
    }
};

export { updateById };
