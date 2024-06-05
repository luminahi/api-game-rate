import { testServer } from "../testServer.js";
import { getToken, insertGameData, insertUser } from "../testSetup.js";

beforeAll(async () => insertUser());

beforeEach(async () => insertGameData());

describe("game deletion", () => {
    const accessToken = getToken();

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
