import { count } from "./count.js";
import { create } from "./create.js";
import { getAll } from "./getAll.js";
import { getById } from "./getById.js";
import { patchById } from "./patchById.js";
import { deleteById } from "./deleteById.js";

const ratingService = {
    count,
    create,
    getAll,
    getById,
    patchById,
    deleteById,
};

export { ratingService };
