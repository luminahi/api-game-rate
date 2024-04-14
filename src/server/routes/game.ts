import { Router } from "express";
import { create, getAll } from "../controllers/game/index.js";
import { bodyValidation } from "../database/validations/game/bodyValidation.js";

const router = Router();

router.post("/", bodyValidation, create);
router.get("/", getAll);

export { router as gameRouter };
