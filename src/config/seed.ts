import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import User from "../models/User";

dotenv.config();

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI as string);

  const existing = await User.findOne({ email: "admin@techzone.com" });
  if (existing) {
    console.log("Admin already exists");
    process.exit();
  }

  const hashed = await bcrypt.hash("admin123", 12);
  await User.create({
    name: "Admin",
    email: "admin@techzone.com",
    password: hashed,
    role: "admin"
  });

  console.log("✅ Admin created: admin@techzone.com / admin123");
  process.exit();
};

seed();