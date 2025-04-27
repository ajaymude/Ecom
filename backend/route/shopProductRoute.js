import express from "express";
import { getFilteredProducts, getProductDetails } from "../controller/shopProductController.js";


export const shopProductsRouter = express.Router();


shopProductsRouter.route("/get").get(getFilteredProducts);
shopProductsRouter.route("/get/:id").get(getProductDetails);







