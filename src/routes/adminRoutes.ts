import { Router } from "express";
import { getDashboard } from "../controllers/adminController";
import { isAuthenticated, isAdmin } from "../middleware/authMiddleware";

const router = Router();

router.get("/dashboard", isAuthenticated, isAdmin, getDashboard);

export default router;