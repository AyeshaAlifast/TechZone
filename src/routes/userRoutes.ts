import { Router } from "express";
import {
  getHome,
  getAbout,
  getProducts,
  getProductDetails,
  getCart,
  postAddToCart,
  postRemoveFromCart,
  getContact,
  postContact
} from "../controllers/userController";

import {
  getCheckout,
  createOrder,
  getOrderConfirmation,
  getUserOrders,
  getOrderById
} from "../controllers/orderController";

const router = Router();

/* Auth Middleware */
const isLoggedIn = (req: any, res: any, next: any) => {
  if (!req.session.userId) {
    req.flash("error", "Login required");
    return res.redirect("/login");
  }
  next();
};

/* Public */
router.get("/", getHome);
router.get("/about", getAbout);
router.get("/contact", getContact);
router.post("/contact", postContact);

router.get("/products", getProducts);
router.get("/products/:id", getProductDetails);

/*  CART ROUTES */
router.get("/cart", getCart);
router.post("/cart/add", postAddToCart);
router.post("/cart/remove", postRemoveFromCart);

/* ORDER ROUTES  */
router.get("/checkout", isLoggedIn, getCheckout);
router.post("/checkout", isLoggedIn, createOrder);

router.get("/order-confirmation", isLoggedIn, getOrderConfirmation);
router.get("/purchase-history", isLoggedIn, getUserOrders);
router.get("/orders", isLoggedIn, getUserOrders);
router.get("/orders/:id", isLoggedIn, getOrderById);

export default router;