import { Handler } from "express";
import { ratingService } from "../../database/services/rating/index.js";

const patchById: Handler = async (req, res) => {
    console.log(req.params);
    const id = Number.parseInt(req.params.id);
    if (!id)
        return res.status(400).json({ error: `invalid id: ${req.params.id}` });

    const { rating } = req.body;

    await ratingService.patchById(id, rating);

    res.status(200).json();
};

export { patchById };
