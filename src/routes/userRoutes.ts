import { Router } from "express";
import {
  getHome,
  getAbout,
  getProducts,
  getProductDetails,
  getCart,
  postAddToCart,
  postRemoveFromCart,
  getCheckout,
  postCheckout,
  getOrderConfirmation,
  getPurchaseHistory,
  getContact,
  postContact
} from "../controllers/userController";

const router = Router();

router.get("/", getHome);
router.get("/about", getAbout);
router.get("/products", getProducts);
router.get("/products/:id", getProductDetails);
router.get("/cart", getCart);
router.post("/cart/add", postAddToCart);
router.post("/cart/remove", postRemoveFromCart);
router.get("/checkout", getCheckout);
router.post("/checkout", postCheckout);
router.get("/order-confirmation", getOrderConfirmation);
router.get("/purchase-history", getPurchaseHistory);
router.get("/contact", getContact);
router.post("/contact", postContact);

export default router;