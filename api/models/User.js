import mongoose from "mongoose";

const UserModel = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: {
      type: String,
      default: "Seeker",
      enum: ["Seeker", "Poster", "Admin"],
    },
    active: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const modelUser = mongoose.model("User", UserModel);

export default modelUser;
