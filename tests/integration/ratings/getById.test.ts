import { testServer } from "../testServer.js";
import { getToken, insertRatingData } from "../../testSetup.js";
import connection from "../../../src/server/database/connection.js";

beforeEach(async () => {
    await connection.synchronize(true);
    await insertRatingData();
});

describe("rating retrieval - one", () => {
    const accessToken = getToken();

    it("retrieves one rating by id", async () => {
        const res = await testServer
            .get("/api/v1/ratings/1")
            .auth(accessToken, { type: "bearer" })
            .expect(200);

        expect(res.body).toHaveProperty("rating");
    });

    it("tries to retrieve one rating by id without auth", async () => {
        const res = await testServer.get("/api/v1/ratings/1").expect(401);

        expect(res.body).toHaveProperty("error", "not authorized");
    });

    it("tries to retrieve one rating with a invalid id", async () => {
        const res1 = await testServer
            .get("/api/v1/ratings/-1")
            .auth(accessToken, { type: "bearer" })
            .expect(400);

        const res2 = await testServer
            .get("/api/v1/ratings/@")
            .auth(accessToken, { type: "bearer" })
            .expect(400);

        expect(res1.body).toHaveProperty("errors");
        expect(res2.body).toHaveProperty("errors");
    });
});
