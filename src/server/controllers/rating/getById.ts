import { Handler } from "express";
import { ratingService } from "../../database/services/rating/index.js";
import { Result } from "../../shared/util/Result.js";

const getById: Handler = async (req, res, next) => {
    const id = Number.parseInt(req.params.id);
    if (!id) return next(Result.asFailure(400, `invalid id: ${req.params.id}`));

    const result = await ratingService.getById(id);

    if (result.isFailure()) return next(result);

    return res.status(200).json({ rating: result.unwrap() });
};

export { getById };
