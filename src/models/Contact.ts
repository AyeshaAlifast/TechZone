import mongoose, { Document, Schema } from "mongoose";

export interface IContact extends Document {
  name: string;
  email: string;
  message: string;
  createdAt: Date;
}

const ContactSchema = new Schema<IContact>({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IContact>("Contact", ContactSchema);