import { Handler } from "express";
import { verifyAccessToken } from "../util/jwtUtil.js";

const accessControl: Handler = (req, res, next) => {
    if (!req.headers.authorization)
        return res.status(401).json({ error: "not authorized" });

    const [identifier, token] = req.headers.authorization.split(" ");

    if (identifier !== "Bearer")
        return res.status(401).json({ error: "invalid token" });

    const payload = verifyAccessToken(token);

    if (!payload || !payload?.exp)
        return res.status(401).json({ error: "invalid token" });

    if (new Date().getSeconds() > payload.exp * 1000)
        return res.status(401).json({ error: "token expired" });

    next();
};

export { accessControl };
