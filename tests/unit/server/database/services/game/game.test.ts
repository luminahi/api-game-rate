import { gameService } from "../../../../../../src/server/database/services/game/index.js";
import { Game } from "../../../../../../src/server/database/entities/game/Game.js";
import { fail } from "assert";
import connection from "../../../../../../src/server/database/connection.js";

beforeEach(async () => {
    await connection.synchronize(true);
    const repository = connection.getRepository(Game);

    const game1 = new Game();
    const game2 = new Game();
    const game3 = new Game();

    game1.name = "Dream Game";
    game2.name = "Nightmare Game";
    game3.name = "Wonder Game";

    await repository.save([game1, game2, game3]);
});

describe("gameService", () => {
    it("counts the number of games", async () => {
        const result = await gameService.count();
        const gameCount = result.unwrap();

        expect(gameCount).toBeDefined();
        expect(gameCount).toBe(3);
    });

    it("gets one game by id", async () => {
        const result = await gameService.getById(1);
        const game = result.unwrap();

        if (!game) fail();

        expect(game).toBeInstanceOf(Game);
        expect(game.name).toBeDefined();
    });

    it("creates a game and counts", async () => {
        const game = new Game();
        game.name = "The Fourth Game";

        const createResult = await gameService.create(game);
        const newGame = createResult.unwrap();

        if (!newGame) fail();

        const countResult = await gameService.count();
        const count = countResult.unwrap();

        if (!count) fail();

        expect(newGame).toBeInstanceOf(Game);
        expect(newGame.name).toBe(game.name);
        expect(newGame.id).toBeDefined();
        expect(count).toBe(4);
    });

    it("deletes a game and counts", async () => {
        const deleteResult = await gameService.deleteById(1);
        const affected = deleteResult.unwrap();

        if (!affected) fail();

        const countResult = await gameService.count();
        const count = countResult.unwrap();

        if (!count) fail();

        const getResult = await gameService.getById(1);
        expect(getResult.unwrap).toThrow();
        expect(count).toBe(2);
    });
});
