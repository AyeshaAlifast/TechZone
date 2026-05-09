import { Router } from "express";
import {
  getLogin,
  getSignup,
  postLogin,
  postSignup,
  logout
} from "../controllers/authController";

import { isAuthenticated } from "../middleware/authMiddleware";

const router = Router();

/* =====================
   AUTH PAGES
===================== */
router.get("/login", getLogin);
router.get("/signup", getSignup);

/* =====================
   AUTH ACTIONS
===================== */
router.post("/login", postLogin);
router.post("/signup", postSignup);
router.get("/logout", logout);

/* =====================
   PROTECTED TEST ROUTE (important)
===================== */
router.get("/profile", isAuthenticated, (req, res) => {
  res.send("User Profile Page");
});

export default router;