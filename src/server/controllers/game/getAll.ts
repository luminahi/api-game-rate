import { Handler } from "express";
import { gameService } from "../../database/services/game/index.js";

const getAll: Handler = async (req, res, next) => {
    const result = await gameService.getAll();

    if (result.isFailure()) return next(result);

    return res.status(200).json({ games: result.unwrap() });
};

export { getAll };
