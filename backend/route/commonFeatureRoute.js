import express from "express";
import {
  addProductReview,
  getProductReviews,
} from "../controller/shopReviewController.js";

export const commonFeatureRouter = express.Router();

commonFeatureRouter.route("/:keyword").post(addProductReview);
commonFeatureRouter.route("/:keyword").get(getProductReviews);
