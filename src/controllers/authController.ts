import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/User";

// Show login page
export const getLogin = (req: Request, res: Response) => {
  res.render("auth/login", { error: req.flash("error") });
};

// Show signup page
export const getSignup = (req: Request, res: Response) => {
  res.render("auth/signup", { error: req.flash("error") });
};

// Register user
export const postSignup = async (req: Request, res: Response) => {
  const { name, email, password, confirmPassword } = req.body;

  if (!name || !email || !password) {
    req.flash("error", "All fields are required");
    return res.redirect("/auth/signup");
  }

  if (password !== confirmPassword) {
    req.flash("error", "Passwords do not match");
    return res.redirect("/auth/signup");
  }

  if (password.length < 6) {
    req.flash("error", "Password must be at least 6 characters");
    return res.redirect("/auth/signup");
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      req.flash("error", "Email already registered");
      return res.redirect("/auth/signup");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await User.create({
      name,
      email,
      password: hashedPassword
    });

    req.flash("success", "Account created! Please login");
    res.redirect("/auth/login");
  } catch {
    req.flash("error", "Something went wrong");
    res.redirect("/auth/signup");
  }
};

// Login user
export const postLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    req.flash("error", "All fields are required");
    return res.redirect("/auth/login");
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      req.flash("error", "Invalid email or password");
      return res.redirect("/auth/login");
    }

    if (!user.isActive) {
      req.flash("error", "Account is deactivated");
      return res.redirect("/auth/login");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      req.flash("error", "Invalid email or password");
      return res.redirect("/auth/login");
    }

    (req.session as any).userId = user._id;
    (req.session as any).role = user.role;
    (req.session as any).name = user.name;

    return user.role === "admin"
      ? res.redirect("/admin/dashboard")
      : res.redirect("/");
  } catch {
    req.flash("error", "Something went wrong");
    res.redirect("/auth/login");
  }
};

// Logout user
export const logout = (req: Request, res: Response) => {
  req.session.destroy(() => {
    res.redirect("/auth/login");
  });
};