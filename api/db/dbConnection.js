import * as dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const URI = process.env.DB_URI;

const dbConnect = async () => {
  try {
    await mongoose.connect(URI);
  } catch (error) {
    console.log(error);
  }
};

export default dbConnect;
