import { Handler } from "express";
import { Rating } from "../../database/entities/rating/Rating.js";

const create: Handler = (req, res) => {
    const rating = new Rating();
    console.log(rating);

    res.status(200).json({ msg: "not implemented" });
};

export { create };
