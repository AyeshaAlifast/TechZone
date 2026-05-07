import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/User";
// // GET /login
export const getLogin = (req: Request, res: Response) => {
  res.render("auth/login", { error: req.flash("error") });
};

// GET /signup
export const getSignup = (req: Request, res: Response) => {
  res.render("auth/signup", { error: req.flash("error") });
};

// POST /signup
export const postSignup = async (req: Request, res: Response) => {
  const { name, email, password, confirmPassword } = req.body;

  // Server-side validation
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

    // Hash password with bcrypt
    const hashedPassword = await bcrypt.hash(password, 12);

    await User.create({ name, email, password: hashedPassword });

    req.flash("success", "Account created! Please login.");
    res.redirect("/auth/login");
  } catch (err) {
    req.flash("error", "Something went wrong");
    res.redirect("/auth/signup");
  }
};

// POST /login
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
      req.flash("error", "Your account has been deactivated");
      return res.redirect("/auth/login");
    }

    // Secure hash comparison
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      req.flash("error", "Invalid email or password");
      return res.redirect("/auth/login");
    }

    // Set session
    (req.session as any).userId = user._id;
    (req.session as any).role = user.role;
    (req.session as any).name = user.name;

    if (user.role === "admin") {
      return res.redirect("/admin/dashboard");
    }
    res.redirect("/");

  } catch (err) {
    req.flash("error", "Something went wrong");
    res.redirect("/auth/login");
  }
};

// GET /logout
export const logout = (req: Request, res: Response) => {
  req.session.destroy(() => {
    res.redirect("/auth/login");
  });
};