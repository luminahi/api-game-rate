import { count } from "./count.js";
import { create } from "./create.js";
import { getByEmail } from "./getByEmail.js";
import { getById } from "./getById.js";
import { updateById } from "./updateById.js";

const userService = {
    count,
    create,
    getById,
    updateById,
    getByEmail,
};

export { userService };
