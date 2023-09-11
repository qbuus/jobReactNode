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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SERVER_PORT = process.env.PORT || 8010;

const app = express();

// middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/", rootRouter);

// not found api
app.use("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "notfound.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

// server error
app.use((error, req, res, next) => {
  let errorMsg = "An Error Occured";
  let status = 500;

  if (isHttpError(error)) {
    errorMsg = error.message;
    status = error.status;
  }
  res.status(status).json({ message: `${errorMsg}` });
});

app.listen(SERVER_PORT, () => {
  console.log(`Server is running on port: ${SERVER_PORT}`);
});
