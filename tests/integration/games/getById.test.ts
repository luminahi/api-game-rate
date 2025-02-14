import { testServer } from "../testServer.js";
import { getToken, insertUser, insertGameData } from "../../testSetup.js";
import connection from "../../../src/server/database/connection.js";

beforeAll(async () => await insertUser());

beforeEach(async () => {
    await connection.query("DELETE FROM game");
    await insertGameData();
});

describe("game retrieval - one", () => {
    const accessToken = getToken();

    it("retrieves one user", async () => {
        const res = await testServer
            .get("/api/v1/games/1")
            .auth(accessToken, { type: "bearer" })
            .expect(200);

        expect(res.body).toHaveProperty("game.id", 1);
    });

    it("tries to retrieve one user without auth", async () => {
        const res = await testServer.get("/api/v1/games/1").expect(401);

        expect(res.body).toHaveProperty("error", "not authorized");
    });
});
