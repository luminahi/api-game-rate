import { gameService } from "../../../src/server/database/services/game/index.js";
import { Game } from "../../../src/server/database/entities/Game.js";
import connection from "../../../src/server/database/connection.js";

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
    it("count", async () => {
        const gameCount = await gameService.count();

        expect(gameCount).not.toBeUndefined();
        expect(gameCount).toBe(3);
    });

    it("get one by id", async () => {
        const game = await gameService.getById(1);

        expect(game).toBeInstanceOf(Game);
        expect(game?.name).toBeDefined();
        expect(game?.isDeleted).toBe(false);
    });

    it("creation", async () => {
        const game = new Game();
        game.name = "The Fourth Game";
        const newGame = await gameService.create(game);

        expect(newGame).toBeInstanceOf(Game);
        expect(newGame?.name).toBe(game.name);
        expect(newGame?.id).toBeDefined();
        expect(newGame?.isDeleted).toBe(false);
    });

    it("deletion", async () => {
        await gameService.deleteById(1);
        const game = await gameService.getById(1);

        expect(game).toBeNull();
    });
});
