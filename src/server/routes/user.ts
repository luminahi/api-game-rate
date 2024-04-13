import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.json({ user: "router" });
});

export { router as userRouter };
