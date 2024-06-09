import { fail } from "assert";
import { ratingService } from "../../../../../../src/server/database/services/rating/index.js";
import { insertRatingData, testUser } from "../../../../../testSetup.js";
import connection from "../../../../../../src/server/database/connection.js";

beforeEach(async () => {
    await connection.synchronize(true);
    await insertRatingData();
});

describe("ratingService", () => {
    it("counts the number of ratings", async () => {
        const result = await ratingService.count();
        const ratingCount = result.unwrap();

        expect(ratingCount).toBe(3);
    });

    it("retrieves one rating by id", async () => {
        const result = await ratingService.getById(1);
        const rating = result.unwrap();

        if (!rating) fail();

        expect(rating.game).toBeDefined();
        expect(rating.user).toBeDefined();
    });

    it("retrieves all available ratings", async () => {
        const result = await ratingService.getAll();
        const ratings = result.unwrap();

        expect(ratings).toHaveLength(3);
    });

    it("creates a rating and counts", async () => {
        const createResult = await ratingService.create(10, 3, 1);
        const rating = createResult.unwrap();

        if (!rating) fail();

        const countResult = await ratingService.count();
        const count = countResult.unwrap();

        expect(count).toBe(4);
        expect(rating.rating).toBe(10);
        expect(rating.game.id).toBe(3);
        expect(rating.user.id).toBe(1);
    });

    it("patches the rating of a existing entry", async () => {
        const patchResult = await ratingService.patchById(
            1,
            { ...testUser, id: 1 },
            0
        );

        const affected = patchResult.unwrap();

        if (!affected) fail();

        const getResult = await ratingService.getById(1);
        const rating = getResult.unwrap();

        if (!rating) fail();

        expect(rating.rating).toBe(0);
        expect(rating.user).toBeDefined();
        expect(rating.game).toBeDefined();
    });

    it("deletes a existing rating and counts", async () => {
        const deleteResult = await ratingService.deleteById(1);
        const affected = deleteResult.unwrap();

        if (!affected) fail();

        const countResult = await ratingService.count();
        const count = countResult.unwrap();

        const result = await ratingService.getById(1);

        expect(count).toBe(2);
        expect(result.unwrap).toThrow();
    });

    it("tries to delete a inexistent rating and counts", async () => {
        const result = await ratingService.deleteById(-1).catch(() => fail());

        const countResult = await ratingService.count();
        const count = countResult.unwrap();

        expect(count).toBe(3);
        expect(result.isFailure()).toBe(true);
    });

    it("tries to update the rating of a non existing entry", async () => {
        const patchResult = await ratingService
            .patchById(1, testUser, 2)
            .catch(() => fail());

        expect(patchResult.unwrap).toThrow();

        const getResult = await ratingService.getById(1);

        expect(getResult.unwrap).toThrow();
    });
});
