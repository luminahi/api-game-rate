import { testServer } from "../testServer.js";
import { getToken, insertUser, insertGameData } from "../testSetup.js";

beforeAll(async () => insertUser());

beforeEach(async () => insertGameData());

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
