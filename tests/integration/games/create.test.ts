import { testServer } from "../testServer.js";
import { getToken, insertGameData, insertUser } from "../../testSetup.js";
import connection from "../../../src/server/database/connection.js";

beforeAll(() => insertUser());

beforeEach(async () => {
    await connection.query("DELETE FROM game");
    await insertGameData();
});

describe("game creation", () => {
    const accessToken = getToken();

    it("sends a valid body", async () => {
        const game = { name: "game one" };

        const res = await testServer
            .post("/api/v1/games")
            .send(game)
            .auth(accessToken, { type: "bearer" })
            .expect(201);

        expect(res.body).toHaveProperty("game.name", "game one");
    });

    it("tries to send a empty body without auth", async () => {
        const res = await testServer.post("/api/v1/games").send({}).expect(401);

        expect(res.body).toHaveProperty("error", "not authorized");
    });

    it("tries to send a body without auth", async () => {
        const game = { name: "game one" };

        const res = await testServer
            .post("/api/v1/games")
            .send(game)
            .expect(401);

        expect(res.body).toHaveProperty("error", "not authorized");
    });
});
