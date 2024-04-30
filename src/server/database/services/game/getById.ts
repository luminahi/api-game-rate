import { QueryFailedError } from "typeorm";
import connection from "../../connection.js";
import { Game } from "../../entities/game/Game.js";

const getById = async (id: number): Promise<Game | null> => {
    try {
        const repository = connection.getRepository(Game);

        const result = await repository.findOne({
            select: ["id", "name"],
            where: { id, isDeleted: false },
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
