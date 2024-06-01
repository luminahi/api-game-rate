import supertest from "supertest";
import { server } from "../../../src/server/server.js";
import { Game } from "../../../src/server/database/entities/game/Game.js";
import { userService } from "../../../src/server/database/services/user/index.js";
import { User } from "../../../src/server/database/entities/user/User.js";

const testServer = supertest(server);

describe("game POST", () => {
    let accessToken = "";

    beforeAll(async () => {
        const user = new User();

        user.email = "test@mail.com";
        user.password = "10101010";
        user.username = "fire test";

        await userService.create(user);
        accessToken = userService.generateAccessToken(user);
    });

    it("sends a valid body", async () => {
        const game = new Game();
        game.name = "game one";

        const res = await testServer
            .post("/api/v1/games")
            .send(game)
            .auth(accessToken, { type: "bearer" });

        expect(res.status).toBe(201);
    });

    it("sends a empty body without auth", async () => {
        const res = await testServer.post("/api/v1/games").send({});

        expect(res.status).toBe(401);
    });

    it("sends a body without auth", async () => {
        const game = new Game();
        game.name = "game one";

        const res = await testServer.post("/api/v1/games").send(game);
        expect(res.status).toBe(401);
    });
});
