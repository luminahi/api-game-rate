import { Router } from "express";
import { create, getAll } from "../controllers/rating/index.js";

const router = Router();

router.post("/", create);
router.get("/", getAll);

export { router as ratingRouter };
