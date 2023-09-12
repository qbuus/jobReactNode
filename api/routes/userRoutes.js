import express from "express";
import * as userRouter from "../controllers/User.js";

const router = express.Router();

router.post("/create", userRouter.createUser);

export default router;
