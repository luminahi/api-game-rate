import jwt from "jsonwebtoken";
import { IUser } from "../../database/entities/user/IUser.js";

const generateJwtToken = (data: IUser): string => {
    const secret = process.env.JWT_SECRET;

    if (!secret) throw new Error("secret is undefined");

    const { username, email } = data;
    const token = jwt.sign({ username, email }, secret, {
        algorithm: "HS256",
        expiresIn: "1d",
    });

    return token;
};

const verifyJwtToken = (token: string): jwt.JwtPayload => {
    const secret = process.env.JWT_SECRET;

    if (!secret) throw new Error("secret is undefined");

    const result = jwt.verify(token, secret);
    if (typeof result === "string") throw new Error(result);

    return result;
};

export { generateJwtToken, verifyJwtToken };
