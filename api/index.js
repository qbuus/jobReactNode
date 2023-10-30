import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import rootRouter from "./routes/main.js";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import corsOptions from "./corsConfig/Options.js";
import cookieParser from "cookie-parser";
import createHttpError, { isHttpError } from "http-errors";
import dbConnection from "./db/dbConnection.js";
import mongoose from "mongoose";
import errorHandler from "./middleware/errorHandler.js";
import userRoutes from "./routes/userRoutes.js";
import offerRoutes from "./routes/offerRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SERVER_PORT = process.env.PORT || 8010;

const app = express();

// db
dbConnection();

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

// routes
app.use("/", rootRouter);
app.use("/users", userRoutes);
app.use("/offers", offerRoutes);

// not found api
app.use("*", (req, res, next) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(
      path.join(__dirname, "views", "notfound.html")
    );
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

// server error
app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to DB");
  app.listen(SERVER_PORT, () => {
    console.log(`Server is running on port: ${SERVER_PORT}`);
  });
});

mongoose.connection.on("error", (error) => {
  console.log(`${error}`);
});
