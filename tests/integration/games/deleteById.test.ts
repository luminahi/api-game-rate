import { testServer } from "../testServer.js";
import { getToken, insertGameData, insertUser } from "../../testSetup.js";
import connection from "../../../src/server/database/connection.js";

beforeAll(async () => await insertUser());

beforeEach(async () => {
    await connection.query("DELETE FROM game");
    await insertGameData();
});

describe("game deletion", () => {
    const accessToken = getToken();

    it("deletes one game", async () => {
        await testServer
            .delete("/api/v1/games/1")
            .auth(accessToken, { type: "bearer" })
            .expect(204);

        const res = await testServer
            .get("/api/v1/games/1")
            .auth(accessToken, { type: "bearer" })
            .expect(404);

        expect(res.body).toHaveProperty(
            "message",
            "game with id '1' not found"
        );
    });

    it("tries to delete one game without auth", async () => {
        const res1 = await testServer.delete("/api/v1/games/1").expect(401);
        expect(res1.body).toHaveProperty("error", "not authorized");

        const res2 = await testServer
            .get("/api/v1/games/1")
            .auth(accessToken, { type: "bearer" })
            .expect(200);

        expect(res2.body).toHaveProperty("game.id", 1);
    });
});
