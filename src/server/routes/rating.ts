import { Router } from "express";
import { create, getAll, getById } from "../controllers/rating/index.js";

const router = Router();

router.post("/", create);
router.get("/", getAll);
router.get("/:id", getById);

export { router as ratingRouter };
