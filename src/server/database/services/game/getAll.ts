import { QueryFailedError } from "typeorm";
import connection from "../../connection.js";
import { Game } from "../../entities/game/Game.js";

const getAll = async (): Promise<Game[]> => {
    try {
        const repository = connection.getRepository(Game);

        const games = await repository.find({
            cache: true,
            select: ["id", "name"],
            where: { isDeleted: false },
        });
        return games;
    } catch (err: unknown) {
        if (err instanceof QueryFailedError) {
            console.error(err.message);
        }
        return [];
    }
};

export { getAll };
