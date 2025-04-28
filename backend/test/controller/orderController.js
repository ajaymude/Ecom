import expressAsyncHandler from "express-async-handler";
import { Order } from "../model/Order.js";

export const getAllOrdersOfAllUsers = expressAsyncHandler(async (req, res) => {
  const orders = await Order.find({});

  if (!orders.length) {
    return res.status(404).json({
      success: false,
      message: "No orders found!",
    });
  }
});

export const getOrderDetailsForAdmin = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  const order = await Order.findById(id);

  if (!order) {
    return res.status(404).json({
      success: false,
      message: "Order not found!",
    });
  }

  res.status(200).json({
    success: true,
    data: order,
  });
});


export const updateOrderStatus = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const { orderStatus } = req.body;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found!",
      });
    }

    await Order.findByIdAndUpdate(id, { orderStatus });

    res.status(200).json({
      success: true,
      message: "Order status is updated successfully!",
    });
});