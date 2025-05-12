import express from "express"
import { adminRoute, protectRoute } from "../middleware/authMiddleware.js";
import { applyCoupon, getCoupon } from "../controllers/couponController.js";
import {getOrders, getSingleOrder,updateFulfillmentStatus } from "../controllers/orderController.js"


const router = express.Router();


router.get("/", protectRoute, adminRoute, getOrders );
router.get("/:id", protectRoute, getSingleOrder );
router.patch("/:id/fulfillment-status", protectRoute, adminRoute, updateFulfillmentStatus);


export default router;