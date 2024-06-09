import { testServer } from "../testServer.js";
import { getToken, insertUser, insertGameData } from "../../testSetup.js";
import connection from "../../../src/server/database/connection.js";

beforeAll(async () => await insertUser());

beforeEach(async () => {
    await connection.query("DELETE FROM game");
    await insertGameData();
});

describe("game update", () => {
    const accessToken = getToken();

    it("updates a single game", async () => {
        const game = { name: "Cool Game" };

        await testServer
            .patch("/api/v1/games/1")
            .send(game)
            .auth(accessToken, { type: "bearer" })
            .expect(204);

        const res = await testServer
            .get("/api/v1/games/1")
            .auth(accessToken, { type: "bearer" })
            .expect(200);

        expect(res.body).toHaveProperty("game.name", "Cool Game");
    });

    it("tries to update a single game without auth", async () => {
        const game = { name: "Cool Game" };

        const res1 = await testServer
            .patch("/api/v1/games/1")
            .send(game)
            .expect(401);

        expect(res1.body).toHaveProperty("error", "not authorized");

        const res2 = await testServer
            .get("/api/v1/games/1")
            .auth(accessToken, { type: "bearer" })
            .expect(200);

        expect(res2.body).not.toHaveProperty("game.name", "Cool Game");
    });
});
