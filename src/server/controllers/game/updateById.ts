import { Handler } from "express";
import { gameService } from "../../database/services/game/index.js";
import { Game } from "../../database/entities/game/Game.js";

const updateById: Handler = async (req, res) => {
    const id = Number.parseInt(req.params.id);
    if (!id)
        return res.status(400).json({ error: `invalid id: ${req.params.id}` });

    const game: Game = req.body;
    await gameService.updateById(id, game);

    res.status(204).send();
};

export { updateById };
