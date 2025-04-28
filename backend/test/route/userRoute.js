import express from "express";

import { authMiddleware } from "../middleware/authMiddleware.js";
import { signinValidator, signupValidator } from "../middleware/validator.js";
import { getUser, userSignin, userSignout, userSignup, } from "../controller/userController.js";

export const userRouter = express.Router();

userRouter.route("/sign-up").post(signupValidator, userSignup);
userRouter.route("/sign-in").post(signinValidator,userSignin);
userRouter.route("/sign-out").post(userSignout);
userRouter.route("/get-user").get(authMiddleware, getUser); 
