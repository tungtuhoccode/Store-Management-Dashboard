import express from "express"
import { adminRoute, protectRoute } from "../middleware/authMiddleware.js";
import { applyCoupon, getCoupon } from "../controllers/couponController.js";
import {getOrders } from "../controllers/orderController.js"


const router = express.Router();


router.get("/", protectRoute, adminRoute, getOrders );
//late add add coupon route for admin


export default router;