import { Request, Response } from "express";
import crypto from "crypto";
import bcrypt from "bcrypt";
import UserModel from "../models/User";
import transporter from "../config/mailer";

// GET /password/forgot
export const getForgotPassword = (req: Request, res: Response) => {
  res.render("auth/forgot", { 
    error: req.flash("error"),
    success: req.query.sent ? "Reset link sent to your email! Check your inbox." : null
  });
};

// POST /password/forgot
export const postForgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  
  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      req.flash("error", "No account with that email");
      return res.redirect("/password/forgot");
    }

    const token = crypto.randomBytes(32).toString("hex");
    user.resetToken = token;
    user.resetTokenExpiry = new Date(Date.now() + 1000 * 60 * 30);
    await user.save();

    const resetLink = `http://localhost:3000/password/reset/${token}`;
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "TechZone Password Reset",
      html: `<p>Click this link to reset your password (valid 30 mins):</p>
             <a href="${resetLink}">${resetLink}</a>`
    });

    return res.redirect("/password/forgot?sent=true");

  } catch (err) {
    console.error("Email error:", err);
    req.flash("error", "Failed to send email. Check server config.");
    return res.redirect("/password/forgot");
  }
};

// GET /password/reset/:token
export const getResetPassword = async (req: Request, res: Response) => {
  const user = await UserModel.findOne({
    resetToken: req.params.token,
    resetTokenExpiry: { $gt: new Date() }
  });

  if (!user) {
    req.flash("error", "Invalid or expired reset link");
    return res.redirect("/password/forgot");
  }

  res.render("auth/reset", { token: req.params.token, error: req.flash("error") });
};

// POST /password/reset/:token
export const postResetPassword = async (req: Request, res: Response) => {
  const { password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    req.flash("error", "Passwords do not match");
    return res.redirect(`/password/reset/${req.params.token}`);
  }

  if (password.length < 6) {
    req.flash("error", "Password must be at least 6 characters");
    return res.redirect(`/password/reset/${req.params.token}`);
  }

  const user = await UserModel.findOne({
    resetToken: req.params.token,
    resetTokenExpiry: { $gt: new Date() }
  });

  if (!user) {
    req.flash("error", "Invalid or expired reset link");
    return res.redirect("/password/forgot");
  }

  user.password = await bcrypt.hash(password, 12);
  user.resetToken = undefined!;
  user.resetTokenExpiry = undefined!;
  await user.save();

  req.flash("success", "Password reset successful! Please login.");
  res.redirect("/auth/login");
};