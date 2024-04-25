import { count } from "./count.js";
import { create } from "./create.js";
import { getById } from "./getById.js";
import { updateById } from "./updateById.js";

const userService = {
    count,
    create,
    getById,
    updateById,
};

export { userService };
