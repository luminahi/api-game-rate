import { Router } from "express";
import {
    create,
    getAll,
    getById,
    patchById,
    deleteById,
} from "../controllers/rating/index.js";
import { bodyValidation } from "../shared/middlewares/validations/rating/bodyValidation.js";
import { patchValidation } from "../shared/middlewares/validations/rating/patchValidation.js";

const router = Router();

router.post("/", bodyValidation, create);
router.get("/", getAll);
router.get("/:id", getById);
router.patch("/:id", patchValidation, patchById);
router.delete("/:id", deleteById);

export { router as ratingRouter };
