import { Handler } from "express";
import { Schema, ValidationError, object, string } from "yup";
import { IUser } from "../../../../database/entities/IUser.js";

const userSchema: Schema<Omit<IUser, "username">> = object({
    email: string().email().nonNullable().required(),
    password: string().min(8).required(),
});

const signInValidation: Handler = async (req, res, next) => {
    try {
        await userSchema.validate(req.body, { abortEarly: false });
        return next();
    } catch (err: unknown) {
        if (err instanceof ValidationError) {
            return res.status(400).json({ errors: { ...err.errors } });
        }
    }
};

export { signInValidation };
