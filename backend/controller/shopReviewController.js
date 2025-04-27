import expressAsyncHandler from "express-async-handler";
import { Order } from "../model/Order.js";
import { ProductReview } from "../model/reviewModel.js";


export const addProductReview = expressAsyncHandler(async (req, res) => {
    const { productId, userId, userName, reviewMessage, reviewValue } =
    req.body;

  const order = await Order.findOne({
    userId,
    "cartItems.productId": productId,
    // orderStatus: "confirmed" || "delivered",
  });

  if (!order) {
    return res.status(403).json({
      success: false,
      message: "You need to purchase product to review it.",
    });
  }

  const checkExistinfReview = await ProductReview.findOne({
    productId,
    userId,
  });

  if (checkExistinfReview) {
    return res.status(400).json({
      success: false,
      message: "You already reviewed this product!",
    });
  }

  const newReview = new ProductReview({
    productId,
    userId,
    userName,
    reviewMessage,
    reviewValue,
  });

  await newReview.save();

  const reviews = await ProductReview.find({ productId });
  const totalReviewsLength = reviews.length;
  const averageReview =
    reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
    totalReviewsLength;

  await Product.findByIdAndUpdate(productId, { averageReview });

  res.status(201).json({
    success: true,
    data: newReview,
  });
})
export const getProductReviews = expressAsyncHandler(async (req, res) => {
    const { productId } = req.params;

    const reviews = await ProductReview.find({ productId });
    res.status(200).json({
      success: true,
      data: reviews,
    });
})