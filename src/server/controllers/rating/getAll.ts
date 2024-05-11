import { Handler } from "express";
import { ratingService } from "../../database/services/rating/index.js";

const getAll: Handler = async (req, res, next) => {
    const result = await ratingService.getAll();

    if (result.isFailure()) return next(result);

    res.status(200).json({ ratings: result.unwrap() });
};

export { getAll };
