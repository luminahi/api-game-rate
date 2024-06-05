import connection from "../../src/server/database/connection.js";
import { Game } from "../../src/server/database/entities/game/Game.js";
import { User } from "../../src/server/database/entities/user/User.js";
import { userService } from "../../src/server/database/services/user/index.js";

const user = {
    email: "test@mail.com",
    password: "10101010",
    username: "tester",
} as User;

const insertUser = async () => userService.create(user);

const insertGameData = async () => {
    const repository = connection.getRepository(Game);
    await repository.query("DELETE FROM game");

    const game1 = new Game();
    const game2 = new Game();
    const game3 = new Game();

    game1.id = 1;
    game1.name = "Dream Game";
    game2.id = 2;
    game2.name = "Nightmare Game";
    game3.id = 3;
    game3.name = "Wonder Game";

    await repository.save([game1, game2, game3]);
};

const getToken = () => userService.generateAccessToken(user);

export { getToken, insertUser, insertGameData };
