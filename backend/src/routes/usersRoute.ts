import { Router } from "express";
import signupUserAuth from "../controllers/auth/signup";
import { loginUserAuth } from "../controllers/auth/login";

const router = Router();

router.post("/signup", signupUserAuth);
router.post("/login", loginUserAuth);

export default router;
