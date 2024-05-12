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

    it("gets one game with a invalid id", async () => {
        const result = await gameService.getById(-100);
        expect(result.unwrap).toThrow();
    });

    it("gets all games", async () => {
        const result = await gameService.getAll();
        const games = result.unwrap();

        expect(games).toHaveLength(3);
    });

    it("creates a game and counts", async () => {
        const game = new Game();
        game.name = "The Fourth Game";

        const createResult = await gameService.create(game);
        expect(createResult.isSuccess()).toBe(true);
        const newGame = createResult.unwrap();

        if (!newGame) fail();

        const countResult = await gameService.count();
        expect(countResult.isSuccess()).toBe(true);
        const count = countResult.unwrap();

        if (!count) fail();

        expect(newGame).toBeInstanceOf(Game);
        expect(newGame.name).toBe(game.name);
        expect(newGame.id).toBeDefined();
        expect(count).toBe(4);
    });

    it("tries to create a game using a undefined name", async () => {
        const game = new Game();

        const createResult = await gameService.create(game);
        expect(createResult.isFailure()).toBe(true);
        expect(createResult.unwrap).toThrow();
    });

    it("deletes a game and counts", async () => {
        const deleteResult = await gameService.deleteById(1);
        const affected = deleteResult.unwrap();

        if (!affected) fail();

        const countResult = await gameService.count();
        const count = countResult.unwrap();

        if (!count) fail();

        const getResult = await gameService.getById(1);
        expect(getResult.isFailure()).toBe(true);
        expect(getResult.unwrap).toThrow();
        expect(count).toBe(2);
    });

    it("tries to delete a inexistent entry", async () => {
        const deleteResult = await gameService.deleteById(100);
        expect(deleteResult.isFailure()).toBe(true);
        expect(deleteResult.unwrap).toThrow();
    });

    it("tries to delete a entry with a invalid id", async () => {
        const deleteResult = await gameService.deleteById(-100);
        expect(deleteResult.isFailure()).toBe(true);
        expect(deleteResult.unwrap).toThrow();
    });

    it("patch a existing game", async () => {
        const game = new Game();
        game.name = "Patch: The Game";

        const result = await gameService.patchById(2, { ...game });
        expect(result.isSuccess()).toBe(true);
        expect(result.unwrap()).toBe(1);
    });

    it("update a existing game", async () => {
        const game = new Game();
        game.name = "Update: The Game";

        const result = await gameService.updateById(2, game);
        expect(result.isSuccess()).toBe(true);
        expect(result.unwrap()).toBe(1);
    });

    it("patch a inexistent game", async () => {
        const game = new Game();
        game.name = "Update: The Game";

        const result = await gameService.patchById(5, game);
        expect(result.isFailure()).toBe(true);
        expect(result.unwrap).toThrow();
    });

    it("update a inexistent game", async () => {
        const game = new Game();
        game.name = "Update: The Game";

        const result = await gameService.updateById(5, game);
        expect(result.isFailure()).toBe(true);
        expect(result.unwrap).toThrow();
    });
});
