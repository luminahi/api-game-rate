import { Handler } from "express";
import { generateAccessToken } from "../../shared/util/jwtUtil.js";
import { userService } from "../../database/services/user/index.js";

const signIn: Handler = async (req, res, next) => {
    const { email, password } = req.body;

    const result = await userService.verifyUser(email, password);

    if (result.isFailure()) return next(result);

    const token = generateAccessToken({
        username: result.unwrap().username,
        email,
    });

    return res.status(200).json({ token });
};

export { signIn };
