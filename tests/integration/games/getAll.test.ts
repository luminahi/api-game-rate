import { testServer } from "../testServer.js";
import { getToken, signTester } from "../testSetup.js";
import { Game } from "../../../src/server/database/entities/game/Game.js";
import connection from "../../../src/server/database/connection.js";

beforeEach(async () => {
    await connection.synchronize(true);
    const repository = connection.getRepository(Game);

    const game1 = new Game();
    const game2 = new Game();
    const game3 = new Game();

    game1.name = "Dream Game";
    game2.name = "Nightmare Game";
    game3.name = "Wonder Game";

    await signTester();
    await repository.save([game1, game2, game3]);
});

describe("game retrieval - all", () => {
    const accessToken = getToken();

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
