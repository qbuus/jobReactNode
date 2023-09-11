import { Schema, Model } from "mongoose";

const userModel = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, default: "Seeker" },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default Model("User", userModel);
