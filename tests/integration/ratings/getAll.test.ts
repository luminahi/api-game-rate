import { testServer } from "../testServer.js";
import { getToken, insertRatingData } from "../../testSetup.js";
import connection from "../../../src/server/database/connection.js";

beforeEach(async () => {
    await connection.synchronize(true);
    await insertRatingData();
});

describe("rating retrieval - all", () => {
    const accessToken = getToken();

    it("retrieves all ratings", async () => {
        const res = await testServer
            .get("/api/v1/ratings")
            .auth(accessToken, { type: "bearer" })
            .expect(200);

        expect(res.body).toHaveProperty("ratings");
    });

    it("tries to retrieve all ratings without auth", async () => {
        const res = await testServer.get("/api/v1/ratings").expect(401);

        expect(res.body).toHaveProperty("error", "not authorized");
    });
});
