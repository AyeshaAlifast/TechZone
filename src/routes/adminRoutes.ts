import { Router } from "express";
//import { getDashboard } from "../controllers/adminController";
import { getDashboard, getUsers, toggleUserStatus, changeUserRole,getProducts, getAddProduct, postAddProduct, getEditProduct, postEditProduct, deleteProduct  } from "../controllers/adminController";
import { isAuthenticated, isAdmin } from "../middleware/authMiddleware";

const router = Router();

router.get("/dashboard", isAuthenticated, isAdmin, getDashboard);

export default router;

router.get("/users", isAuthenticated, isAdmin, getUsers);
router.post("/users/:id/toggle", isAuthenticated, isAdmin, toggleUserStatus);
router.post("/users/:id/role", isAuthenticated, isAdmin, changeUserRole);
router.get("/products", isAuthenticated, isAdmin, getProducts);
router.get("/products/add", isAuthenticated, isAdmin, getAddProduct);
router.post("/products/add", isAuthenticated, isAdmin, postAddProduct);
router.get("/products/:id/edit", isAuthenticated, isAdmin, getEditProduct);
router.post("/products/:id/edit", isAuthenticated, isAdmin, postEditProduct);
router.post("/products/:id/delete", isAuthenticated, isAdmin, deleteProduct);