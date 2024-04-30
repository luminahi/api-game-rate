import { Handler } from "express";
import { ratingService } from "../../database/services/rating/index.js";

const getById: Handler = async (req, res) => {
    const id = Number.parseInt(req.params.id);
    if (!id)
        return res.status(400).json({ error: `invalid id: ${req.params.id}` });

    const rating = await ratingService.getById(id);
    res.status(200).json({ rating });
};

export { getById };
