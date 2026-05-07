import { Request, Response } from "express";
import UserModel from "../models/User";

export const getDashboard = async (req: Request, res: Response) => {
  const totalUsers = await UserModel.countDocuments({ role: "user" });
  res.render("admin/dashboard", {
    name: (req.session as any).name,
    totalUsers
  });
};