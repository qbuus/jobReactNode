import * as dotenv from "dotenv";
dotenv.config();
import express from "express";

const SERVER_PORT = process.env.PORT || 8010;

const app = express();

app.listen(SERVER_PORT, () => {
  console.log(`Server is running on port: ${SERVER_PORT}`);
});
