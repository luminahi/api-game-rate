import { Router } from "express";
import {
    create,
    getAll,
    getById,
    updateById,
    deleteById,
} from "../controllers/game/index.js";
import { bodyValidation } from "../database/validations/game/bodyValidation.js";

const router = Router();

router.post("/", bodyValidation, create);
router.get("/", getAll);
router.get("/:id", getById);
router.put("/:id", bodyValidation, updateById);
router.delete("/:id", deleteById);

export { router as gameRouter };
