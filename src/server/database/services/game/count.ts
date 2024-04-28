import { QueryFailedError } from "typeorm";
import connection from "../../connection.js";
import { Game } from "../../entities/game/Game.js";

const count = async (): Promise<number> => {
    try {
        const repository = connection.getRepository(Game);

        return await repository.count({ where: { isDeleted: false } });
    } catch (err: unknown) {
        if (err instanceof QueryFailedError) {
            console.error(err.message);
            return 0;
        }
        return 0;
    }
};

export { count };
