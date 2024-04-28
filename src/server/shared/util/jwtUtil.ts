import jwt from "jsonwebtoken";
import { IUser } from "../../database/entities/user/IUser.js";

const generateAccessToken = (data: IUser): string => {
    const secret = process.env.JWT_SECRET;
    //TODO

    if (!secret) return "";

    const { username, email } = data;
    const token = jwt.sign({ username, email }, secret, {
        algorithm: "HS256",
        expiresIn: "1d",
    });

    return token;
};

const verifyAccessToken = (token: string): jwt.JwtPayload | null => {
    const secret = process.env.JWT_SECRET;

    //TODO
    if (!secret) return null;

    const result = jwt.verify(token, secret);
    if (typeof result === "string") return null;

    return result;
};

export { generateAccessToken, verifyAccessToken };
