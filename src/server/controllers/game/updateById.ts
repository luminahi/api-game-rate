import { Handler } from "express";
import { gameService } from "../../database/services/game/index.js";
import { Game } from "../../database/entities/game/Game.js";

const updateById: Handler = async (req, res, next) => {
    const id = Number.parseInt(req.params.id);
    const game: Game = req.body;

    const result = await gameService.updateById(id, game);

    if (result.isFailure()) return next(result);

    return res.status(204).json();
};

export { updateById };
