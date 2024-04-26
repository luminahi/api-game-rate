import { Router } from "express";
import {
    create,
    getAll,
    getById,
    updateById,
    deleteById,
    patchById,
} from "../controllers/game/index.js";
import { bodyValidation } from "../shared/middlewares/validations/game/bodyValidation.js";
import { optionalBodyValidation } from "../shared/middlewares/validations/game/optionalBodyValidation.js";

const router = Router();

router.post("/", bodyValidation, create);
router.get("/", getAll);
router.get("/:id", getById);
router.put("/:id", bodyValidation, updateById);
router.patch("/:id", optionalBodyValidation, patchById);
router.delete("/:id", deleteById);

export { router as gameRouter };
