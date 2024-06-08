import { testServer } from "../testServer.js";
import { getToken, insertRatingData } from "../../testSetup.js";
import connection from "../../../src/server/database/connection.js";

beforeEach(async () => {
    await connection.synchronize(true);
    await insertRatingData();
});

describe("rating creation", () => {
    const accessToken = getToken();

    it("register a new rating", async () => {
        const rating = { rating: 8, userId: 1, gameId: 2 };

        const res = await testServer
            .post("/api/v1/ratings")
            .send(rating)
            .auth(accessToken, { type: "bearer" })
            .expect(201);

        expect(res.body).toHaveProperty("rating");
    });

    it("tries to register a new rating without auth", async () => {
        const rating = { rating: 8, userId: 1, gameId: 2 };

        const res = await testServer
            .post("/api/v1/ratings")
            .send(rating)
            .expect(401);

        expect(res.body).toHaveProperty("error", "not authorized");
    });

    it("tries to rate a game already rated by the user", async () => {
        const rating = { rating: 8, userId: 1, gameId: 1 };

        const res = await testServer
            .post("/api/v1/ratings")
            .send(rating)
            .auth(accessToken, { type: "bearer" })
            .expect(400);

        expect(res.body).toHaveProperty("message");
    });

    it("tries to rate a game without providing data", async () => {
        const res = await testServer
            .post("/api/v1/ratings")
            .send({})
            .auth(accessToken, { type: "bearer" })
            .expect(400);

        expect(res.body).toHaveProperty("errors");
    });
});
