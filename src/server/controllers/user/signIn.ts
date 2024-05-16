import { Handler } from "express";
import { userService } from "../../database/services/user/index.js";
import { generateAccessToken } from "../../database/services/user/generateAccessToken.js";

const signIn: Handler = async (req, res, next) => {
    const { email, password } = req.body;

    const result = await userService.verifyUser(email, password);

    if (result.isFailure()) return next(result);

    const token = generateAccessToken(result.unwrap());

    return res.status(200).json({ token });
};

export { signIn };
