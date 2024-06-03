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

describe("game deletion", () => {
    let accessToken = "";

    beforeAll(async () => {
        const user = new User();

        user.email = "test@mail.com";
        user.password = "10101010";
        user.username = "fire test";

        await userService.create(user);
        accessToken = userService.generateAccessToken(user);
    });

    it("deletes one game", async () => {
        const res1 = await testServer
            .delete("/api/v1/games/1")
            .auth(accessToken, { type: "bearer" });

        expect(res1.status).toBe(204);

        const res2 = await testServer
            .get("/api/v1/games/1")
            .auth(accessToken, { type: "bearer" });

        expect(res2.status).toBe(404);
        expect(res2.body).toEqual({ message: "game with id '1' not found" });
    });

    it("deletes one game without auth", async () => {
        const res1 = await testServer.delete("/api/v1/games/1");

        expect(res1.status).toBe(401);

        const res2 = await testServer
            .get("/api/v1/games/1")
            .auth(accessToken, { type: "bearer" });

        expect(res2.status).toBe(200);
        expect(res2.body).toEqual({ game: { id: 1, name: "Dream Game" } });
    });
});
