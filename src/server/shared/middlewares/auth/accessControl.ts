import { Handler } from "express";
import { verifyAccessToken } from "../../util/jwtUtil.js";

const accessControl: Handler = (req, res, next) => {
    try {
        if (!req.headers.authorization)
            return res.status(401).json({ error: "not authorized" });

        const [identifier, token] = req.headers.authorization.split(" ");

        if (identifier !== "Bearer")
            return res.status(401).json({ error: "invalid token" });

        const payload = verifyAccessToken(token);

        if (!payload || !payload?.exp)
            return res.status(401).json({ error: "invalid token" });

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
