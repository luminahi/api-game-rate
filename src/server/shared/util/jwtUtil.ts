import jwt from "jsonwebtoken";
import { IUser } from "../../database/entities/IUser.js";

const generateAccessToken = (data: Omit<IUser, "password">): string => {
    //TODO
    const token = jwt.sign(data, "secret", {
        algorithm: "HS256",
        expiresIn: "1d",
    });

    return token;
};

const verifyAccessToken = (token: string): jwt.JwtPayload | null => {
    //TODO
    const decodedToken = jwt.verify(token, "secret");
    if (typeof decodedToken === "string") return null;

    return decodedToken;
};

export { generateAccessToken, verifyAccessToken };
