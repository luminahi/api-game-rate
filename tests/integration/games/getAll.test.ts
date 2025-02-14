import { testServer } from "../testServer.js";
import { getToken, insertUser, insertGameData } from "../../testSetup.js";
import connection from "../../../src/server/database/connection.js";

beforeAll(async () => await insertUser());

beforeEach(async () => {
    await connection.query("DELETE FROM game");
    await insertGameData();
});

describe("game retrieval - all", () => {
    const accessToken = getToken();

    it("retrieves all users", async () => {
        const res = await testServer
            .get("/api/v1/games")
            .auth(accessToken, { type: "bearer" })
            .expect(200);

        expect(res.body).toHaveProperty("games");
    });

    it("tries to retrieve all users without auth", async () => {
        const res = await testServer.get("/api/v1/games").expect(401);

        expect(res.body).toHaveProperty("error", "not authorized");
    });
});
