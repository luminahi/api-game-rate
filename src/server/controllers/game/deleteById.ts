import { Handler } from "express";
import { gameService } from "../../database/services/game/index.js";

const deleteById: Handler = async (req, res, next) => {
    const id = Number.parseInt(req.params.id);
    const result = await gameService.deleteById(id);

    if (result.isFailure()) return next(result);

    return res.status(204).json();
};

export { deleteById };
