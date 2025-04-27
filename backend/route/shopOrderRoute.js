import express from "express";
import { capturePayment, createOrder, getAllOrdersByUser, getOrderDetails } from "../controller/shopOrderController.js";

export const shopOrderRouter = express.Router();

shopOrderRouter.route("/create").post(createOrder);
shopOrderRouter.route("/capture").post(capturePayment);
shopOrderRouter.route("/list/:userId").get(getAllOrdersByUser);
shopOrderRouter.route("/details/:id").get(getOrderDetails);
