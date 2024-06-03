import { Handler } from "express";
import { verifyJwtToken } from "../../util/jwtUtil.js";
import { userService } from "../../../database/services/user/index.js";

const accessControl: Handler = async (req, res, next) => {
    try {
        if (!req.headers.authorization)
            return res.status(401).json({ error: "not authorized" });

        const [identifier, token] = req.headers.authorization.split(" ");

        if (identifier !== "Bearer")
            return res.status(401).json({ error: "invalid token" });

        const payload = verifyJwtToken(token);

        if (!payload || !payload?.exp)
            return res.status(401).json({ error: "invalid token" });

        const { email } = payload;
        const user = await userService.getByEmail(email);
        if (user.isFailure()) throw new Error("your account was deactivated");

        if (Date.now() > payload.exp * 1000)
            return res.status(401).json({ error: "token expired" });

        next();
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error(err.message);
            return res.status(500).json({ error: err.message });
        }

        return res.status(500).json({ error: "internal error" });
    }
};

export { accessControl };
