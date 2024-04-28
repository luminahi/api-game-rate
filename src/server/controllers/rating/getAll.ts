import { Handler } from "express";
import { ratingService } from "../../database/services/rating/index.js";

const getAll: Handler = async (req, res) => {
    const ratings = await ratingService.getAll();
    console.log(ratings);
    res.status(200).json({ ratings });
};

export { getAll };
