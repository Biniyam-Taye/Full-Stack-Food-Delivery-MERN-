import express from "express";
import authMiddleware from "../middleware/Auth.js";
import {
  listOrders,
  placeOrder,
  updateOrderStatus,
  usersOrder,
  verifyOrder,
} from "../controllers/orderController.js";
const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/verify", verifyOrder);
orderRouter.post("/userOrders", authMiddleware, usersOrder);
orderRouter.get("/list", listOrders);
orderRouter.post("/status", updateOrderStatus);
export default orderRouter;
