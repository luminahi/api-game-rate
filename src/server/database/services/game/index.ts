import { create } from "./create.js";
import { getAll } from "./getAll.js";
import { getById } from "./getById.js";
import { count } from "./count.js";
import { updateById } from "./updateById.js";
import { deleteById } from "./deleteById.js";

const gameService = {
    create,
    getAll,
    getById,
    count,
    updateById,
    deleteById,
};

export { gameService };
