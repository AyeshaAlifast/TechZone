import { Request, Response } from "express";
import ProductModel from "../models/Products";
import ContactModel from "../models/Contact";

export const getHome = async (req: Request, res: Response) => {
  const products = await ProductModel.find().limit(8);
  res.render("user/home", { products });
};

export const getAbout = (req: Request, res: Response) => {
  res.render("user/about");
};

export const getProducts = async (req: Request, res: Response) => {
  const { search, category } = req.query;
  let query: any = {};

  if (search) {
    query.name = { $regex: search, $options: "i" };
  }

  if (category) {
    query.category = category;
  }

  const products = await ProductModel.find(query);
  res.render("user/products", { products, search, category });
};

export const getProductDetails = async (req: Request, res: Response) => {
  const product = await ProductModel.findById(req.params.id);
  res.render("user/productDetails", { product });
};

export const getCart = (req: Request, res: Response) => {
  // For simplicity, using session for cart
  const cart = (req.session as any).cart || [];
  res.render("user/cart", { cart });
};

export const postAddToCart = async (req: Request, res: Response) => {
  const { productId, quantity } = req.body;
  const product = await ProductModel.findById(productId);

  if (!product) {
    req.flash("error", "Product not found");
    return res.redirect("/products");
  }

  const cart = (req.session as any).cart || [];
  const existingItem = cart.find((item: any) => item.productId === productId);

  if (existingItem) {
    existingItem.quantity += parseInt(quantity);
  } else {
    cart.push({
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: parseInt(quantity)
    });
  }

  (req.session as any).cart = cart;
  req.flash("success", "Product added to cart");
  res.redirect("/cart");
};

export const postRemoveFromCart = (req: Request, res: Response) => {
  const { productId } = req.body;
  const cart = (req.session as any).cart || [];
  (req.session as any).cart = cart.filter((item: any) => item.productId !== productId);
  req.flash("success", "Product removed from cart");
  res.redirect("/cart");
};

export const getCheckout = (req: Request, res: Response) => {
  const cart = (req.session as any).cart || [];
  const total = cart.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);
  res.render("user/checkout", { cart, total });
};

export const postCheckout = (req: Request, res: Response) => {
  // Simulate order processing
  (req.session as any).cart = [];
  req.flash("success", "Order placed successfully");
  res.redirect("/order-confirmation");
};

export const getOrderConfirmation = (req: Request, res: Response) => {
  res.render("user/orderConfirmation");
};

export const getPurchaseHistory = (req: Request, res: Response) => {
  // For simplicity, no actual history
  res.render("user/purchaseHistory", { orders: [] });
};

export const getContact = (req: Request, res: Response) => {
  res.render("user/contact", { error: req.flash("error"), success: req.flash("success") });
};

export const postContact = async (req: Request, res: Response) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    req.flash("error", "All fields are required");
    return res.redirect("/contact");
  }

  await ContactModel.create({ name, email, message });
  req.flash("success", "Message sent successfully");
  res.redirect("/contact");
};