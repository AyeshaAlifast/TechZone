import { Request, Response } from "express";
import Order from "../models/Order";

/* Checkout page */
export const getCheckout = (req: Request, res: Response) => {
  const cart = (req.session as any).cart || [];

  const total = cart.reduce(
    (sum: number, item: any) => sum + item.price * item.quantity,
    0
  );

  res.render("user/checkout", { cart, total });
};

/* Create Order */
export const createOrder = async (req: Request, res: Response) => {
  const cart = (req.session as any).cart || [];

  if (!cart.length) {
    req.flash("error", "Cart is empty");
    return res.redirect("/cart");
  }

  const { name, email, phone, city, address } = req.body;

  if (!name || !email || !phone || !city || !address) {
    req.flash("error", "All fields are required");
    return res.redirect("/checkout");
  }

  const total = cart.reduce(
    (sum: number, item: any) => sum + item.price * item.quantity,
    0
  );

  const order: any = await Order.create({
    user: (req.session as any).userId,

    products: cart.map((item: any) => ({
      product: item.productId,
      quantity: item.quantity,
      price: item.price
    })),

    totalAmount: total,

    shippingAddress: {
      street: address,
      city,
      country: "Pakistan"
    }
  });

  (req.session as any).cart = [];

  return res.redirect(`/order-confirmation?id=${order._id}`);
};

/* 
   ORDER CONFIRMATION */
export const getOrderConfirmation = async (req: Request, res: Response) => {
  const order = await Order.findById(req.query.id);

  if (!order) return res.redirect("/");

  res.render("user/orderConfirmation", { order });
};

/* USER ORDERS (FIXED) */
export const getUserOrders = async (req: any, res: any) => {
  const userId = req.session.userId;

  if (!userId) {
    req.flash("error", "Please login to view your orders");
    return res.redirect("/login");
  }

  const orders = await Order.find({ user: userId })
    .sort({ createdAt: -1 });

  res.render("user/purchaseHistory", { orders });
};

/* SINGLE ORDER */
export const getOrderById = async (req: any, res: any) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    req.flash("error", "Order not found");
    return res.redirect("/orders");
  }

  res.render("user/orderDetails", { order });
};

