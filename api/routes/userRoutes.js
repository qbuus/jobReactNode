import express from "express";
import * as userRouter from "../controllers/User.js";

const router = express.Router();

router.post("/create", userRouter.createUser);
router.get("", userRouter.getAllUser);
router.post("/login", userRouter.login);
router.post("/passwordChange", userRouter.changePassword);

export default router;
