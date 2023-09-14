import express from "express";
import * as userRouter from "../controllers/User.js";
import verifyJwt from "../middleware/verifyJwt.js";
import {
  loginLimiter,
  passwordChangeLimiter,
} from "../middleware/requestLimit.js";

const router = express.Router();

router.post("/create", userRouter.createUser);
router.get("", userRouter.getAllUser);
router.post("/login", loginLimiter, userRouter.login);
router.post(
  "/passwordChange",
  verifyJwt,
  passwordChangeLimiter,
  userRouter.changePassword
);
router.get("/refreshToken", userRouter.refreshToken);
router.post("/logout", verifyJwt, userRouter.logout);
router.post(
  "/update",
  verifyJwt,
  passwordChangeLimiter,
  userRouter.updateUserBesidePassword
);

export default router;
