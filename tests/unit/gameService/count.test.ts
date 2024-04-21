import { count } from "../../../src/server/database/services/game/count.js";
import connection from "../../../src/server/database/connection.js";
import { Game } from "../../../src/server/database/entities/Game.js";

beforeAll(async () => {
    const repository = connection.getRepository(Game);

    const game1 = new Game();
    const game2 = new Game();
    const game3 = new Game();

    game1.name = "Dream Game";
    game2.name = "Nightmare Game";
    game3.name = "Wonder Game";

    await repository.save([game1, game2, game3]);
});

describe("game count -> gameService", () => {
    it("first test", async () => {
        const gameCount = await count();

        expect(gameCount).not.toBeUndefined();
    });
});
