import { Router } from "express";
import { getLogin, getSignup, postLogin, postSignup, logout } from "../controllers/authController";

const router = Router();

router.get("/login", getLogin);
router.get("/signup", getSignup);
router.post("/login", postLogin);
router.post("/signup", postSignup);
router.get("/logout", logout);

export default router;