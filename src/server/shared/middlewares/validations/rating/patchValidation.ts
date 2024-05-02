import { Schema, ValidationError, number, object } from "yup";
import { IRating } from "../../../../database/entities/rating/IRating.js";
import { Handler } from "express";

const ratingSchema: Schema<IRating> = object({
    rating: number().min(0).max(10).nonNullable().required(),
});

const patchValidation: Handler = async (req, res, next) => {
    try {
        await ratingSchema.validate(req.body, { abortEarly: false });

        return next();
    } catch (err: unknown) {
        if (err instanceof ValidationError) {
            return res.status(400).json({ errors: { ...err.errors } });
        }
    }
};

export { patchValidation };
