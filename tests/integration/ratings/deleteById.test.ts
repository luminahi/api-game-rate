import { testServer } from "../testServer.js";
import { getToken, insertRatingData } from "../../testSetup.js";
import connection from "../../../src/server/database/connection.js";

beforeEach(async () => {
    await connection.synchronize(true);
    await insertRatingData();
});

describe("rating deletion", () => {
    const accessToken = getToken();

    it("deletes one rating by id", async () => {
        const res1 = await testServer
            .delete("/api/v1/ratings/1")
            .auth(accessToken, { type: "bearer" })
            .expect(204);

        const res2 = await testServer
            .get("/api/v1/ratings/1")
            .auth(accessToken, { type: "bearer" })
            .expect(404);

        expect(res1.body).toEqual({});
        expect(res2.body).toHaveProperty("message");
    });

    it("tries to delete one rating with a invalid id", async () => {
        const res1 = await testServer
            .delete("/api/v1/ratings/-1")
            .auth(accessToken, { type: "bearer" })
            .expect(400);

        const res2 = await testServer
            .delete("/api/v1/ratings/@")
            .auth(accessToken, { type: "bearer" })
            .expect(400);

        expect(res1.body).toHaveProperty("errors");
        expect(res2.body).toHaveProperty("errors");
    });

    it("tries to delete one rating by id without auth", async () => {
        const res = await testServer.delete("/api/v1/ratings/1").expect(401);

        expect(res.body).toHaveProperty("error", "not authorized");
    });
});
