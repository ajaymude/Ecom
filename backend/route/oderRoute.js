import express from "express";
import { getAllOrdersOfAllUsers, getOrderDetailsForAdmin, updateOrderStatus } from "../controller/orderController.js";

export const orderRouter = express.Router();

orderRouter.route("/get").get(getAllOrdersOfAllUsers);
orderRouter.route("/details/:id").get(getOrderDetailsForAdmin);
orderRouter.route("/update/:id").put(updateOrderStatus);
