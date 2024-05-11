import { Handler } from "express";
import { generateAccessToken } from "../../shared/util/jwtUtil.js";
import { userService } from "../../database/services/user/index.js";
import { verifyPassword } from "../../shared/util/passwordUtil.js";
import { Result } from "../../shared/util/Result.js";

const signIn: Handler = async (req, res, next) => {
    const { email, password } = req.body;

    const result = await userService.getByEmail(email);
    if (result.isFailure())
        return next(Result.asFailure(401, "invalid email/password"));

    const isValidPassword = await verifyPassword(
        password,
        result.unwrap().password
    );

    if (!isValidPassword)
        return next(Result.asFailure(401, "invalid email/password"));

    const token = generateAccessToken({
        username: result.unwrap().username,
        email,
    });

    return res.status(200).json({ token });
};

export { signIn };
