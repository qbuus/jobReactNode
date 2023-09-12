import * as dotenv from "dotenv";
dotenv.config();

const URL_CLIENT = process.env.CLIENT;

export const allowedByCors = [
  "http://localhost:5173",
  "https://reqbin.com",
];
