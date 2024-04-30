import { QueryFailedError } from "typeorm";
import connection from "../../connection.js";
import { Rating } from "../../entities/rating/Rating.js";

const getById = async (id: number): Promise<Rating | null> => {
    try {
        const repository = connection.getRepository(Rating);

        const builder = repository.createQueryBuilder();

        const result = await builder
            .select("rating")
            .addSelect("User.username", "user")
            .addSelect("Game.name", "game")
            .leftJoin("game", "Game", "gameId = Game.id")
            .leftJoin("user", "User", "userId = User.id")
            .where({ id })
            .execute();

        const rating = repository.create(result)[0];

        return rating;
    } catch (err: unknown) {
        if (err instanceof QueryFailedError) {
            console.error(err.message);
        }

        return null;
    }
};

export { getById };
