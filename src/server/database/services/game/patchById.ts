import { QueryFailedError } from "typeorm";
import connection from "../../connection.js";
import { Game } from "../../entities/game/Game.js";

const patchById = async (id: number, game: Game): Promise<void> => {
    try {
        const repository = connection.getRepository(Game);

        await repository.update({ id }, { ...game });
    } catch (err: unknown) {
        if (err instanceof QueryFailedError) {
            console.error(err.message);
        }
    }
};

export { patchById };
