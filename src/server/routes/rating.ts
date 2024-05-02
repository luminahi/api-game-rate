import { Router } from "express";
import {
    create,
    getAll,
    getById,
    patchById,
} from "../controllers/rating/index.js";
import { bodyValidation } from "../shared/middlewares/validations/rating/bodyValidation.js";
import { patchValidation } from "../shared/middlewares/validations/rating/patchValidation.js";

const router = Router();

router.post("/", bodyValidation, create);
router.get("/", getAll);
router.get("/:id", getById);
router.patch("/:id", patchValidation, patchById);

export { router as ratingRouter };
