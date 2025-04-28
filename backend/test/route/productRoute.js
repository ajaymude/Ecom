import express from "express";

import { productValidator } from "../middleware/validator.js";
import {
  addProduct,
  editProduct,
  fetchAllProducts,
} from "../controller/productController.js";

export const productRouter = express.Router();


productRouter.route("/add-product").post(productValidator, addProduct);
productRouter.route("/edit/:id").put(editProduct);
productRouter.route("/delete/:id").delete(addProduct);
productRouter.route("/get").get(fetchAllProducts);
