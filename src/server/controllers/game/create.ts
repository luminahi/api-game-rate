import { Handler } from "express";
import { gameService } from "../../database/services/game/index.js";

const create: Handler = async (req, res, next) => {
    const result = await gameService.create(req.body);

    if (result.isFailure()) return next(result);

    const { id, name } = result.unwrap();
    return res.status(201).json({ game: { id, name } });
};

export { create };
