import express from "express";

import { signupValidator } from "../middleware/userValidator.js";
import { getUser, userSignin, userSignout, userSignup, userTest } from "../controller/userController.js";

export const userRouter = express.Router();

userRouter.route("/sign-up").get(signupValidator, userSignup);
userRouter.route("/sign-in").get(signupValidator,userSignin);
userRouter.route("/sign-out").get(userSignout);
userRouter.route("/get-user").get(getUser); 
