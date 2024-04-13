import { Router } from "express";
import { create, getAll } from "../controllers/game/index.js";

const router = Router();

router.post("/", create);
router.get("/", getAll);

export { router as gameRouter };
