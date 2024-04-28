import { gameService } from "../../../../../../src/server/database/services/game/index.js";
import { Game } from "../../../../../../src/server/database/entities/game/Game.js";
import connection from "../../../../../../src/server/database/connection.js";

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

describe("gameService", () => {
    it("counts the number of games", async () => {
        const gameCount = await gameService.count();

        expect(gameCount).toBeDefined();
        expect(gameCount).toBe(3);
    });

    it("get one game by id", async () => {
        const game = await gameService.getById(1);

        if (!game) fail();

        expect(game).toBeInstanceOf(Game);
        expect(game.name).toBeDefined();
    });

    it("creates a game", async () => {
        const game = new Game();
        game.name = "The Fourth Game";
        const newGame = await gameService.create(game);

        if (!newGame) fail();

        expect(newGame).toBeInstanceOf(Game);
        expect(newGame.name).toBe(game.name);
        expect(newGame.id).toBeDefined();
    });

    it("deletes a game", async () => {
        await gameService.deleteById(1);
        const game = await gameService.getById(1);

        expect(game).toBeNull();
    });
});
