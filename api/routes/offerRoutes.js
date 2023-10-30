import express from "express";
import verifyJwt from "../middleware/verifyJwt.js";
import * as offerController from "../controllers/Offer.js";
import { OfferLimiter } from "../middleware/requestLimit.js";

const router = express.Router();

router.post(
  "/new",
  verifyJwt,
  OfferLimiter,
  offerController.createNewOffer
);

router.get("/my-offers", verifyJwt, offerController.UserOffers);

export default router;
