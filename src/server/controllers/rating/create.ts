import { Handler } from "express";
import { ratingService } from "../../database/services/rating/index.js";

const create: Handler = async (req, res, next) => {
    const { rating, gameId, userId } = req.body;

    const result = await ratingService.create(rating, gameId, userId);

    if (result.isFailure()) return next(result);

    return res.status(201).json({ rating: result.unwrap() });
};

export { create };
