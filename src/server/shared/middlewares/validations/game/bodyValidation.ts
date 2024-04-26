import { Handler } from "express";
import { ValidationError, object, string } from "yup";

const gameSchema = object({
    name: string().max(128).nonNullable().required(),
});

const bodyValidation: Handler = async (req, res, next) => {
    try {
        await gameSchema.validate(req.body, { abortEarly: false });
        return next();
    } catch (err: unknown) {
        if (err instanceof ValidationError) {
            return res.status(400).json({ errors: { ...err.errors } });
        }
    }
};

export { bodyValidation };
