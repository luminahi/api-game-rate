import { getByEmail } from "./getByEmail.js";
import { Result } from "../../../shared/util/Result.js";
import { verifyPassword } from "../../../shared/util/passwordUtil.js";
import { generateAccessToken } from "../../../shared/util/jwtUtil.js";

const verifyUser = async (
    email: string,
    password: string
): Promise<Result<string | null>> => {
    const result = await getByEmail(email);

    if (result.isFailure())
        return Result.asFailure(401, "invalid email/password");

    const isValidPassword = await verifyPassword(
        password,
        result.unwrap().password
    );

    if (!isValidPassword)
        return Result.asFailure(401, "invalid email/password");

    const token = generateAccessToken({
        username: result.unwrap().username,
        email,
    });

    return Result.wrap(token);
};

export { verifyUser };
