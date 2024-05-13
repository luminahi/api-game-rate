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
import { paramsValidation } from "../shared/middlewares/validations/paramsValidation.js";
import { optionalBodyValidation } from "../shared/middlewares/validations/game/optionalBodyValidation.js";

const router = Router();

router.post("/", bodyValidation, create);
router.get("/", getAll);
router.get("/:id", paramsValidation, getById);
router.put("/:id", paramsValidation, bodyValidation, updateById);
router.patch("/:id", paramsValidation, optionalBodyValidation, patchById);
router.delete("/:id", paramsValidation, deleteById);

export { router as gameRouter };
