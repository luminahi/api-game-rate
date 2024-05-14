import { Router } from "express";
import {
    create,
    getAll,
    getById,
    patchById,
    deleteById,
} from "../controllers/rating/index.js";
import { bodyValidation } from "../shared/middlewares/validations/rating/bodyValidation.js";
import { paramsValidation } from "../shared/middlewares/validations/paramsValidation.js";
import { patchValidation } from "../shared/middlewares/validations/rating/patchValidation.js";

const router = Router();

router.post("/", bodyValidation, create);
router.get("/", getAll);
router.get("/:id", paramsValidation, getById);
router.patch("/:id", paramsValidation, patchValidation, patchById);
router.delete("/:id", paramsValidation, deleteById);

export { router as ratingRouter };
