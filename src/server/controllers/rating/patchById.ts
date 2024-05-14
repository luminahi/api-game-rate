import { Handler } from "express";
import { ratingService } from "../../database/services/rating/index.js";

const patchById: Handler = async (req, res, next) => {
    const id = Number.parseInt(req.params.id);
    const { rating } = req.body;

    const result = await ratingService.patchById(id, rating);

    if (result.isFailure()) return next(result);

    res.status(204).json();
};

export { patchById };
