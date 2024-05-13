import { Handler } from "express";
import { gameService } from "../../database/services/game/index.js";

const getById: Handler = async (req, res, next) => {
    const id = Number.parseInt(req.params.id);
    const result = await gameService.getById(id);

    if (result.isFailure()) return next(result);

    return res.status(200).json({ game: result.unwrap() });
};

export { getById };
