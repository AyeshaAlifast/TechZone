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

// Pages
router.get("/", getHome);
router.get("/about", getAbout);
router.get("/contact", getContact);
router.post("/contact", postContact);

// Products
router.get("/products", getProducts);
router.get("/products/:id", getProductDetails);

// Cart
router.get("/cart", getCart);
router.post("/cart/add", postAddToCart);
router.post("/cart/remove", postRemoveFromCart);

// Checkout (NOW FROM ORDER CONTROLLER)
router.get("/checkout", getCheckout);
router.post("/checkout", createOrder);
router.get("/order-confirmation", getOrderConfirmation);

// Orders
router.get("/orders", getUserOrders);
router.get("/orders/:id", getOrderById);

export default router;