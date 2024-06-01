import supertest from "supertest";
import { server } from "../../../src/server/server.js";
import { Game } from "../../../src/server/database/entities/game/Game.js";

const testServer = supertest(server);

describe("game POST", () => {
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
