import { Request, Response, NextFunction } from "express";

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if ((req.session as any).userId) {
    return next();
  }
  req.flash("error", "Please login first");
  res.redirect("/auth/login");
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if ((req.session as any).role === "admin") {
    return next();
  }
  res.status(403).send("Access denied");
};