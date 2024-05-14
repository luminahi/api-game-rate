import { Handler } from "express";
import { ratingService } from "../../database/services/rating/index.js";

const getById: Handler = async (req, res, next) => {
    const id = Number.parseInt(req.params.id);

    const result = await ratingService.getById(id);

    if (result.isFailure()) return next(result);

    return res.status(200).json({ rating: result.unwrap() });
};

export { getById };
