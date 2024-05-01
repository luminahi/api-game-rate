import { Router } from "express";
import { create, getAll, getById } from "../controllers/rating/index.js";
import { bodyValidation } from "../shared/middlewares/validations/rating/bodyValidation.js";

const router = Router();

router.post("/", bodyValidation, create);
router.get("/", getAll);
router.get("/:id", getById);

export { router as ratingRouter };
