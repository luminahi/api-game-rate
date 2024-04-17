import { QueryFailedError } from "typeorm";
import connection from "../../connection.js";
import { Game } from "../../entities/Game.js";

const getById = async (id: number) => {
    try {
        const repository = connection.getRepository(Game);

        const result = await repository.findOne({ where: { id } });
        return result;
    } catch (err: unknown) {
        if (err instanceof QueryFailedError) {
            console.error("are you bobeando?");
        }
    }
};

export { getById };
