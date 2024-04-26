import { Router } from "express";
import {
    create,
    getAll,
    getById,
    updateById,
    deleteById,
    patchById,
} from "../controllers/game/index.js";
import { bodyValidation } from "../database/validations/game/bodyValidation.js";
import { optionalBodyValidation } from "../database/validations/game/optionalBodyValidation.js";
import { accessControl } from "../shared/middlewares/accessControl.js";

const router = Router();

router.post("/", bodyValidation, create);
router.get("/", accessControl, getAll);
router.get("/:id", getById);
router.put("/:id", bodyValidation, updateById);
router.patch("/:id", optionalBodyValidation, patchById);
router.delete("/:id", deleteById);

export { router as gameRouter };
