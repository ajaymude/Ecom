import dotenv from "dotenv";
import morgan from "morgan";
import express from "express";
import cookieParser from "cookie-parser";
dotenv.config();

import connectDB from "./config/db.js";

import { router } from "./route/indexRoute.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import chalk from "chalk";

const port = process.env.PORT || 5000;

connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));



app.use(router);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`)
);
