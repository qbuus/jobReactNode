import mongoose, { Schema } from "mongoose";

const TokenModel = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  expireAt: { type: Date, expires: 300 },
});

const tokenUser = mongoose.model("Token", TokenModel);

export default tokenUser;
