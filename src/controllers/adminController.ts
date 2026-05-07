import { Request, Response } from "express";
import UserModel from "../models/User";
import ProductModel from "../models/Products";

export const getDashboard = async (req: Request, res: Response) => {
  const totalUsers = await UserModel.countDocuments({ role: "user" });
  res.render("admin/dashboard", {
    name: (req.session as any).name,
    totalUsers
  });
};
export const getUsers = async (req: Request, res: Response) => {
  const users = await UserModel.find({ role: "user" });
  res.render("admin/users", { users });
};

export const toggleUserStatus = async (req: Request, res: Response) => {
  const user = await UserModel.findById(req.params.id);
  if (user) {
    user.isActive = !user.isActive;
    await user.save();
  }
  res.redirect("/admin/users");
};

export const changeUserRole = async (req: Request, res: Response) => {
  const { role } = req.body;
  await UserModel.findByIdAndUpdate(req.params.id, { role });
  res.redirect("/admin/users");
};
// GET all products
export const getProducts = async (req: Request, res: Response) => {
  const products = await ProductModel.find();
  res.render("admin/products", { products });
};

// GET add product form
export const getAddProduct = (req: Request, res: Response) => {
  res.render("admin/addProduct", { error: req.flash("error") });
};

// POST add product
export const postAddProduct = async (req: Request, res: Response) => {
  const { name, description, price, stock, category, image } = req.body;

  if (!name || !description || !price || !stock || !category) {
    req.flash("error", "All fields are required");
    return res.redirect("/admin/products/add");
  }

  await ProductModel.create({ name, description, price, stock, category, image });
  res.redirect("/admin/products");
};

// GET edit product form
export const getEditProduct = async (req: Request, res: Response) => {
  const product = await ProductModel.findById(req.params.id);
  res.render("admin/editProduct", { product, error: req.flash("error") });
};

// POST edit product
export const postEditProduct = async (req: Request, res: Response) => {
  const { name, description, price, stock, category, image } = req.body;
  await ProductModel.findByIdAndUpdate(req.params.id, { name, description, price, stock, category, image });
  res.redirect("/admin/products");
};

// POST delete product
export const deleteProduct = async (req: Request, res: Response) => {
  await ProductModel.findByIdAndDelete(req.params.id);
  res.redirect("/admin/products");
};