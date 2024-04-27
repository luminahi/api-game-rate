// import connection from "../../../src/server/database/connection.js";
// import { Game } from "../../../src/server/database/entities/Game.js";
// import { Rating } from "../../../src/server/database/entities/Rating.js";
// import { ratingService } from "../../../src/server/database/services/rating/index.js";

// beforeAll(async () => {
//     const repository = connection.getRepository(Rating);

//     const rating1 = new Rating();
//     const rating2 = new Rating();
//     const rating3 = new Rating();

//     // const game1 = new Game();

//     // rating1.game =

//     await repository.save([rating1, rating2, rating3]);
// });

describe("rating test suite", () => {
    it("first rating test", () => {
        expect(0).toBe(0);
    });
});
