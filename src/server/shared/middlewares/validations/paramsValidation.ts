import { Handler } from "express";
import { ValidationError, number, object } from "yup";

const paramSchema = object({
    id: number().integer().min(1).max(Number.MAX_SAFE_INTEGER),
});

const paramsValidation: Handler = async (req, res, next) => {
    try {
        await paramSchema.validate(req.params);
        return next();
    } catch (err: unknown) {
        if (err instanceof ValidationError) {
            return res.status(400).json({ errors: { ...err.errors } });
        }
    }
};

export { paramsValidation };
