import express from "express";
import {
  addAddress,
  deleteAddress,
  editAddress,
  fetchAllAddress,
} from "../controller/shopAddressController.js";

export const shopAddressRouter = express.Router();

shopAddressRouter.route("/add-product").post(addAddress);
shopAddressRouter.route("/edit/:id").get(fetchAllAddress);
shopAddressRouter.route("/delete/:id").delete(editAddress);
shopAddressRouter.route("/get").put(deleteAddress);
