import express from "express";
import { userRouter } from "./userRoute.js";

export const router = express.Router();

router.use('/api/v1/user', userRouter)

