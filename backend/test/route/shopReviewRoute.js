import express from "express";

import {
  addFeatureImage,
  getFeatureImages,
} from "../controller/commonFeatureController.js";

export const showReviewRouter = express.Router();

showReviewRouter.route("/:keyword").post(addFeatureImage);
showReviewRouter.route("/:keyword").get(getFeatureImages);
