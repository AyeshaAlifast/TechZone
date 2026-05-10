import { Request, Response } from "express";
import ProductModel from "../models/Products";
import ContactModel from "../models/Contact";

// export const getHome = async (req: Request, res: Response) => {
//   const products = await ProductModel.find().limit(8);
//   res.render("user/home", { products });
// };
export const getHome = async (req: any, res: any) => {
  const products = await ProductModel.find().limit(6);
  res.render("user/home", { products });
};
export const getAbout = (req: Request, res: Response) => {
  res.render("user/about");
};

export const getProducts = async (req: Request, res: Response) => {
  const search = (req.query.search as string)?.trim();
  const category = (req.query.category as string)?.trim();

  const query: any = {};

  if (search) {
    query.name = { $regex: search, $options: "i" };
  }

  if (category && category !== "") {
    query.category = category;
  }

  const products = await ProductModel.find(query);

  res.render("user/products", {
    products,
    search: search || "",
    category: category || ""
  });
};

export const getProductDetails = async (req: Request, res: Response) => {
  const product = await ProductModel.findById(req.params.id);
  res.render("user/productDetails", { product });
};

export const getCart = (req: Request, res: Response) => {
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
  const existing = cart.find((i: any) => i.productId === productId);

  if (existing) {
    existing.quantity += Number(quantity);
  } else {
    cart.push({
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: Number(quantity)
    });
  }

  (req.session as any).cart = cart;
  req.flash("success", "Added to cart");
  res.redirect("/cart");
};

export const postRemoveFromCart = (req: Request, res: Response) => {
  const { productId } = req.body;
  const cart = (req.session as any).cart || [];

  (req.session as any).cart = cart.filter(
    (item: any) => item.productId !== productId
  );

  req.flash("success", "Removed from cart");
  res.redirect("/cart");
};

export const getContact = (req: Request, res: Response) => {
  res.render("user/contact", {
    error: req.flash("error"),
    success: req.flash("success")
  });
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