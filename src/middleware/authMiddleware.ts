import { Request, Response, NextFunction } from "express";

// Check if user is logged in
export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.session && (req.session as any).userId) {
    return next();
  }
  req.flash?.("error", "Please login first");
  return res.redirect("/auth/login");
};

// Check if user is admin
export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.session && (req.session as any).role === "admin") {
    return next();
  }
  return res.status(403).render("error", { message: "Access denied" });
};