import { Handler } from "express";
import { ratingService } from "../../database/services/rating/index.js";

const deleteById: Handler = async (req, res, next) => {
    const id = Number.parseInt(req.params.id);
    if (!id)
        return res.status(400).json({ error: `invalid id: ${req.params.id}` });

    const result = await ratingService.deleteById(id);

    if (result.isFailure()) return next(result);

    return res.status(204).json();
};

export { deleteById };
