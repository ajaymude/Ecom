import express from "express";
import { addToCart, deleteCartItem, fetchCartItems, updateCartItemQty } from "../controller/shopCartController.js";

export const cartRouter = express.Router();

cartRouter.route("/add").post(addToCart);
cartRouter.route("/get/:userId").get(fetchCartItems);
cartRouter.route("/update-cart").put(updateCartItemQty);
cartRouter.route("/:userId/:productId").delete(deleteCartItem);
