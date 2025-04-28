import express from "express";
import { userRouter } from "./userRoute.js";
import { productRouter } from "./productRoute.js";
import { orderRouter } from "./oderRoute.js";
import { shopProductsRouter } from "./shopProductRoute.js";
import { shopAddressRouter } from "./shopAddressRoute.js";
import { shopOrderRouter } from "./shopOrderRoute.js";
import { shopSearchRouter } from "./shopSearchRoute.js";
import { commonFeatureRouter } from "./commonFeatureRoute.js";
import { cartRouter } from "./shopCartRoute.js";
import { showReviewRouter } from "./shopReviewRoute.js";

export const router = express.Router();

router.use('/api/v1/user', userRouter);
router.use('/api/v1/product', productRouter);
router.use('/api/v1/order', orderRouter);
router.use('/api/v1/shop/product', shopProductsRouter);
router.use('/api/v1/shop/cart', cartRouter);
router.use('/api/v1/shop/address', shopAddressRouter);
router.use('/api/v1/shop/order', shopOrderRouter);
router.use('/api/v1/shop/search', shopSearchRouter);
router.use('/api/v1/shop/review', showReviewRouter);
router.use('/api/v1/shop/common', commonFeatureRouter);





