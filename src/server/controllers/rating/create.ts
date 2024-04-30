import { Handler } from "express";
import { ratingService } from "../../database/services/rating/index.js";

const create: Handler = async (req, res) => {
    const { rating, gameId, userId } = req.body;

    const newRating = await ratingService.create(rating, gameId, userId);
    res.status(200).json({ newRating });
};

export { create };
