import { Handler } from "express";
import { userService } from "../../database/services/user/index.js";

const signUp: Handler = async (req, res, next) => {
    const result = await userService.create(req.body);

    if (result.isFailure()) return next(result);

    const { id, email, username } = result.unwrap();
    return res.status(201).json({ user: { id, email, username } });
};

export { signUp };
