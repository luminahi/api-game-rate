import { Handler } from "express";
import { Schema, ValidationError, object, string } from "yup";
import { IUser } from "../../entities/IUser.js";

const userSchema: Schema<IUser> = object({
    username: string().max(128).nonNullable().required(),
    email: string().email().nonNullable().required(),
    password: string().min(8).required(),
});

const signUpValidation: Handler = async (req, res, next) => {
    try {
        await userSchema.validate(req.body, { abortEarly: false });
        return next();
    } catch (err: unknown) {
        if (err instanceof ValidationError) {
            return res.status(400).json({ errors: { ...err.errors } });
        }
    }
};

export { signUpValidation };
