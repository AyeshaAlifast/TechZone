import { Router } from "express";
//import { getDashboard } from "../controllers/adminController";
import { getDashboard, getUsers, toggleUserStatus, changeUserRole } from "../controllers/adminController";

import { isAuthenticated, isAdmin } from "../middleware/authMiddleware";

const router = Router();

router.get("/dashboard", isAuthenticated, isAdmin, getDashboard);

export default router;

router.get("/users", isAuthenticated, isAdmin, getUsers);
router.post("/users/:id/toggle", isAuthenticated, isAdmin, toggleUserStatus);
router.post("/users/:id/role", isAuthenticated, isAdmin, changeUserRole);