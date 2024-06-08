import connection from "../src/server/database/connection.js";
import { Game } from "../src/server/database/entities/game/Game.js";
import { Rating } from "../src/server/database/entities/rating/Rating.js";
import { User } from "../src/server/database/entities/user/User.js";
import { userService } from "../src/server/database/services/user/index.js";

const testUser = {
    email: "test@mail.com",
    password: "10101010",
    username: "tester",
} as User;

const insertUser = () => userService.create(testUser);

const insertGameData = async () => {
    const repository = connection.getRepository(Game);

    const game1 = new Game();
    const game2 = new Game();
    const game3 = new Game();

    game1.id = 1;
    game1.name = "Dream Game";
    game2.id = 2;
    game2.name = "Nightmare Game";
    game3.id = 3;
    game3.name = "Wonder Game";

    return repository.save([game1, game2, game3]);
};

const insertUserData = async () => {
    const repository = connection.getRepository(User);

    const user1 = new User();
    const user2 = new User();
    const user3 = new User();

    user1.id = 1;
    user1.email = "test@mail.com";
    user1.password = "10101010";
    user1.username = "tester";

    user2.id = 2;
    user2.username = "sarah sousa";
    user2.email = "sarah@mail.com";
    user2.password = "11001111";

    user3.id = 3;
    user3.username = "karin doe";
    user3.email = "karin@mail.com";
    user3.password = "00110011";

    return repository.save([user1, user2, user3]);
};

const insertRatingData = async () => {
    const ratingRepository = connection.getRepository(Rating);

    const [game1, game2, game3] = await insertGameData();
    const [user1, user2, user3] = await insertUserData();

    const rating1 = new Rating();
    const rating2 = new Rating();
    const rating3 = new Rating();

    rating1.id = 1;
    rating1.game = game1;
    rating1.user = user1;
    rating1.rating = 10;

    rating2.id = 2;
    rating2.game = game2;
    rating2.user = user2;
    rating2.rating = 5;

    rating3.id = 3;
    rating3.game = game3;
    rating3.user = user3;
    rating3.rating = 7.5;

    await ratingRepository.save([rating1, rating2, rating3]);
};

const getToken = () => userService.generateAccessToken(testUser);

export {
    getToken,
    insertUser,
    insertGameData,
    insertUserData,
    insertRatingData,
    testUser,
};
