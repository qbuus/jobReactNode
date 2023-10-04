import express from "express";
import * as userRouter from "../controllers/User.js";
import verifyJwt from "../middleware/verifyJwt.js";
import {
  loginLimiter,
  passwordChangeLimiter,
} from "../middleware/requestLimit.js";

const router = express.Router();

router.get("/initialCheck", userRouter.initialTokenCheck);
router.post("/create", userRouter.createUser);
router.get("", userRouter.getAllUser);
router.post("/login", loginLimiter, userRouter.login);
router.put(
  "/passwordChange",
  verifyJwt,
  passwordChangeLimiter,
  userRouter.changePassword
);
router.get("/refreshToken", userRouter.refreshToken);
router.post("/logout", verifyJwt, userRouter.logout);
router.patch(
  "/update",
  verifyJwt,
  passwordChangeLimiter,
  userRouter.updateUserBesidePassword
);
router.get("/profile", verifyJwt, userRouter.getSingleUser);
router.post(
  "/forget-password",
  // passwordChangeLimiter,
  userRouter.forgetPassword
);
router.patch(
  "/set-new-password",
  // passwordChangeLimiter,
  userRouter.changePasswordAfterOTP
);

export default router;
