import { Router } from "express";
import { create, getAll, getById } from "../controllers/game/index.js";
import { bodyValidation } from "../database/validations/game/bodyValidation.js";

const router = Router();

router.post("/", bodyValidation, create);
router.get("/", getAll);
router.get("/:id", getById);

export { router as gameRouter };
