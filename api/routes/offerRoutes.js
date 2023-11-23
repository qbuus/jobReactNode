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

router.get(`/my-offers`, verifyJwt, offerController.UserOffers);

router.patch("/edit", verifyJwt, offerController.editOffer);

router.delete(
  "/delete",
  verifyJwt,
  offerController.deleteOffer
);

router.get("/latest", offerController.latestOffers);
router.get("/highlighted", offerController.highlightedOffers);
router.get("/alloffers", offerController.AllOffers);

export default router;
