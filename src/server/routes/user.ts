import { Router } from "express";
import { signIn, signUp } from "../controllers/user/index.js";
import { signUpValidation } from "../database/validations/user/signUpValidation.js";

const router = Router();

router.post("/signin", signIn);
router.post("/signup", signUpValidation, signUp);

export { router as userRouter };
