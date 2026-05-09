import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  isActive: boolean;
  createdAt: Date;
  resetToken?: string;
  resetTokenExpiry?: Date;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  resetToken: { type: String, default: null },
  resetTokenExpiry: { type: Date, default: null }
});

export default mongoose.model<IUser>("User", UserSchema);