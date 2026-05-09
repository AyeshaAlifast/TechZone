import { Router } from "express";     
import { getForgotPassword, postForgotPassword, getResetPassword, postResetPassword } from "../controllers/passwordController";
const router = Router();

router.get("/forgot", getForgotPassword);
router.post("/forgot", postForgotPassword);
router.get("/reset/:token", getResetPassword);
router.post("/reset/:token", postResetPassword);

export default router;