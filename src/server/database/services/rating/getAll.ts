import connection from "../../connection.js";
import { Rating } from "../../entities/Rating.js";

const getAll = async (): Promise<Rating[]> => {
    const repository = connection.getRepository(Rating);

    const builder = repository.createQueryBuilder();
    const ratings: Rating[] = await builder
        .select("rating")
        .addSelect("User.username", "user")
        .addSelect("Game.name", "game")
        .leftJoin("game", "Game", "gameId = Game.id")
        .leftJoin("user", "User", "userId = User.id")
        .execute();

    return ratings;
};

export { getAll };
