import { getByEmail } from "./getByEmail.js";
import { Result } from "../../../shared/util/Result.js";
import { verifyPassword } from "../../../shared/util/passwordUtil.js";
import { User } from "../../entities/user/User.js";

const verifyUser = async (
    email: string,
    password: string
): Promise<Result<User | null>> => {
    const result = await getByEmail(email);

    if (result.isFailure())
        return Result.asFailure(401, "invalid email/password");

    const isValidPassword = await verifyPassword(
        password,
        result.unwrap().password
    );

    if (!isValidPassword)
        return Result.asFailure(401, "invalid email/password");

    return result;
};

export { verifyUser };
