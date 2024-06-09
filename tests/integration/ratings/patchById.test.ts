import { testServer } from "../testServer.js";
import { getToken, insertRatingData } from "../../testSetup.js";
import connection from "../../../src/server/database/connection.js";

beforeEach(async () => {
    await connection.synchronize(true);
    await insertRatingData();
});

describe("rating patch", () => {
    const accessToken = getToken();

    it("patches a single rating", async () => {
        const rating = { rating: 10 };

        await testServer
            .patch("/api/v1/ratings/1")
            .send(rating)
            .auth(accessToken, { type: "bearer" })
            .expect(204);

        const res = await testServer
            .get("/api/v1/ratings/1")
            .auth(accessToken, { type: "bearer" })
            .expect(200);

        expect(res.body).toHaveProperty("rating.rating", 10);
    });

    it("tries to patch a single rating created by another user", async () => {
        await testServer
            .patch("/api/v1/ratings/2")
            .send({ rating: 10 })
            .auth(accessToken, { type: "bearer" })
            .expect(400);
    });

    it("tries to patch a single rating without auth", async () => {
        await testServer
            .patch("/api/v1/ratings/1")
            .send({ rating: 10 })
            .expect(401);
    });
});
