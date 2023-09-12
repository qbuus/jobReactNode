import express from "express";
import * as userRouter from "../controllers/User.js";

const router = express.Router();

router.post("/create", userRouter.createUser);
router.get("", userRouter.getAllUser);

export default router;
