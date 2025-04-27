import expressAsyncHandler from "express-async-handler";
import { validationResult } from "express-validator";
import { Product } from "../model/productModel.js";




export const addProduct = expressAsyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {
    image,
    title,
    description,
    category,
    brand,
    price,
    salePrice,
    totalStock,
    averageReview,
  } = req.body;

  const newlyCreatedProduct = new Product({
    image,
    title,
    description,
    category,
    brand,
    price,
    salePrice,
    totalStock,
    averageReview,
  });

  await newlyCreatedProduct.save();

  res.status(201).json({
    success: true,
    data: newlyCreatedProduct,
  });
});

export const editProduct = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    image,
    title,
    description,
    category,
    brand,
    price,
    salePrice,
    totalStock,
    averageReview,
  } = req.body;

  let findProduct = await Product.findById(id);
  if (!findProduct)
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });

  findProduct.title = title || findProduct.title;
  findProduct.description = description || findProduct.description;
  findProduct.category = category || findProduct.category;
  findProduct.brand = brand || findProduct.brand;
  findProduct.price = price === "" ? 0 : price || findProduct.price;
  findProduct.salePrice =
    salePrice === "" ? 0 : salePrice || findProduct.salePrice;
  findProduct.totalStock = totalStock || findProduct.totalStock;
  findProduct.image = image || findProduct.image;
  findProduct.averageReview = averageReview || findProduct.averageReview;

  await findProduct.save();
  res.status(200).json({
    success: true,
    data: findProduct,
  });
});

export const deleteProduct = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndDelete(id);
  if (!product)
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });

  res.status(200).json({
    success: true,
    message: "Product delete successfully",
  });
});

export const fetchAllProducts = expressAsyncHandler(async (req, res) => {
  const listOfProducts = await Product.find({});
  res.status(200).json({
    success: true,
    data: listOfProducts,
  });
});
