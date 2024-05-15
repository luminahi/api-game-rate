import { count } from "./count.js";
import { create } from "./create.js";
import { getByEmail } from "./getByEmail.js";
import { getById } from "./getById.js";
import { updateById } from "./updateById.js";
import { verifyUser } from "./verifyUser.js";

const userService = {
    count,
    create,
    getById,
    updateById,
    getByEmail,
    verifyUser,
};

export { userService };
