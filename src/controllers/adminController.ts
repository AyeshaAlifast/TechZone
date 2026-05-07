import { Request, Response } from "express";
import UserModel from "../models/User";

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