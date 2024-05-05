import { fail } from "assert";
import connection from "../../../../../../src/server/database/connection.js";
import { Game } from "../../../../../../src/server/database/entities/game/Game.js";
import { Rating } from "../../../../../../src/server/database/entities/rating/Rating.js";
import { User } from "../../../../../../src/server/database/entities/user/User.js";
import { ratingService } from "../../../../../../src/server/database/services/rating/index.js";

beforeAll(async () => {
    await connection.synchronize(true);

    const ratingRepository = connection.getRepository(Rating);
    const gameRepository = connection.getRepository(Game);
    const userRepository = connection.getRepository(User);

    const game1 = new Game();
    game1.name = "First Game";

    const game2 = new Game();
    game2.name = "Second Game";

    const game3 = new Game();
    game3.name = "Third Game";

    await gameRepository.save([game1, game2, game3]);

    const user1 = new User();
    user1.username = "Alex";
    user1.email = "alex@mail.com";
    user1.password = "10001000";

    const user2 = new User();
    user2.username = "Sarah";
    user2.email = "sarah@mail.com";
    user2.password = "00009999";

    const user3 = new User();
    user3.username = "Karen";
    user3.email = "karen@mail.com";
    user3.password = "karen5050";

    await userRepository.save([user1, user2, user3]);

    const rating1 = new Rating();
    const rating2 = new Rating();
    const rating3 = new Rating();

    rating1.game = game1;
    rating1.user = user1;
    rating1.rating = 10;

    rating2.game = game2;
    rating2.user = user2;
    rating2.rating = 5;

    rating3.game = game3;
    rating3.user = user3;
    rating3.rating = 7.5;

    await ratingRepository.save([rating1, rating2, rating3]);
});

describe("ratingService", () => {
    it("counts the number of ratings", async () => {
        const ratingCount = await ratingService.count();

        expect(ratingCount).toBe(3);
    });

    it("gets one rating by id", async () => {
        const rating = await ratingService.getById(1);

        if (!rating) fail();

        expect(rating).toBeInstanceOf(Rating);
        expect(rating.game).toBe("First Game");
        expect(rating.user).toBe("Alex");
    });

    it("get all available ratings", async () => {
        const ratings = await ratingService.getAll();

        expect(ratings).toHaveLength(3);
    });

    it("creates a rating", async () => {
        const rating = await ratingService.create(10, 3, 1);

        if (!rating) fail();

        expect(rating.game).toBeInstanceOf(Game);
        expect(rating.user).toBeInstanceOf(User);
        expect(rating.rating).toBe(10);
        expect(rating.game.id).toBe(3);
        expect(rating.user.id).toBe(1);
    });

    it("changes the rating of a existing entry", async () => {
        await ratingService.patchById(2, 0);
        const rating = await ratingService.getById(2);

        if (!rating) fail();

        expect(rating.rating).toBe(0);
        expect(rating.user).toBe("Sarah");
        expect(rating.game).toBe("Second Game");
    });

    it("deletes a existing rating", async () => {
        await ratingService.deleteById(1);
        const rating = await ratingService.getById(1);

        expect(rating).toBeNull();
    });

    it("deletes a inexistent rating", async () => {
        await ratingService.deleteById(-1).catch(() => fail());
    });

    it("changes the rating of a non existing entry", async () => {
        await ratingService.patchById(1, 2).catch(() => fail());
        const rating = await ratingService.getById(1);

        if (rating) fail();
    });
});
