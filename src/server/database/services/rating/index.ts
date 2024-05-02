import { count } from "./count.js";
import { create } from "./create.js";
import { getAll } from "./getAll.js";
import { getById } from "./getById.js";
import { patchById } from "./patchById.js";

const ratingService = {
    count,
    create,
    getAll,
    getById,
    patchById,
};

export { ratingService };
