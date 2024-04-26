import { Handler } from "express";
import { generateAccessToken } from "../../shared/util/jwtUtil.js";
import { userService } from "../../database/services/user/index.js";
import { verifyPassword } from "../../shared/util/passwordUtil.js";

const signIn: Handler = async (req, res) => {
    const { email, password } = req.body;

    const user = await userService.getByEmail(email);
    if (!user) return res.status(401).json({ msg: "invalid email/password" });

    const isValidPassword = await verifyPassword(password, user.password);
    if (!isValidPassword)
        return res.status(401).json({ msg: "invalid email/password" });

    const token = generateAccessToken({ username: user.username, email });

    return res.status(200).json({ token });
};

export { signIn };
