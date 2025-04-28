import express from "express";
import { searchProducts } from "../controller/shopSearchController.js";

export const shopSearchRouter = express.Router();

shopSearchRouter.route("/:keyword").get(searchProducts);
