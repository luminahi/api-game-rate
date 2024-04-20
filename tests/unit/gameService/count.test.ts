import { count } from "../../../src/server/database/services/game/count.js";

describe("game count -> gameService", () => {
    it("first test", async () => {
        const gameCount = await count();

        //test
        console.log(process.env.NODE_ENV);

        expect(gameCount).not.toBeUndefined();
    });
});
