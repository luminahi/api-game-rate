import supertest from "supertest";
import { server } from "../../../src/server/server.js";
import { Game } from "../../../src/server/database/entities/game/Game.js";
import { userService } from "../../../src/server/database/services/user/index.js";
import { User } from "../../../src/server/database/entities/user/User.js";
import connection from "../../../src/server/database/connection.js";

const testServer = supertest(server);

beforeEach(async () => {
    await connection.synchronize(true);
    const repository = connection.getRepository(Game);

    const game1 = new Game();
    const game2 = new Game();
    const game3 = new Game();

    game1.name = "Dream Game";
    game2.name = "Nightmare Game";
    game3.name = "Wonder Game";

    await repository.save([game1, game2, game3]);
});

describe("game retrieval - all", () => {
    let accessToken = "";

    beforeAll(async () => {
        const user = new User();

        user.email = "test@mail.com";
        user.password = "10101010";
        user.username = "fire test";

        await userService.create(user);
        accessToken = userService.generateAccessToken(user);
    });

    it("retrieves all users", async () => {
        const res = await testServer
            .get("/api/v1/games")
            .auth(accessToken, { type: "bearer" });

        expect(res.status).toBe(200);
    });

    it("retrieves all users without auth", async () => {
        const res = await testServer.get("/api/v1/games");

        expect(res.status).toBe(401);
    });
});
