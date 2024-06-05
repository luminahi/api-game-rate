import { testServer } from "../testServer.js";
import { getToken, insertUser, insertGameData } from "../testSetup.js";

beforeAll(async () => insertUser());

beforeEach(async () => insertGameData());

describe("game retrieval - one", () => {
    const accessToken = getToken();

    it("retrieves one user", async () => {
        const res = await testServer
            .get("/api/v1/games/1")
            .auth(accessToken, { type: "bearer" });

        expect(res.status).toBe(200);
    });

    it("retrieves one user without auth", async () => {
        const res = await testServer.get("/api/v1/games/1");

        expect(res.status).toBe(401);
    });
});
