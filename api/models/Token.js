import mongoose, { Schema } from "mongoose";

const TokenModel = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 3600 },
});

const tokenUser = mongoose.model("Token", TokenModel);

export default tokenUser;
