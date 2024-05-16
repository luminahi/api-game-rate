import { generateJwtToken } from "../../../shared/util/jwtUtil.js";
import { User } from "../../entities/user/User.js";

const generateAccessToken = (user: User) => {
    const token = generateJwtToken({
        username: user.username,
        email: user.email,
    });

    return token;
};

export { generateAccessToken };
