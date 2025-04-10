import express from "express"
import { protectRoute } from "../middleware/authMiddleware.js";
import { applyCoupon } from "../controllers/couponController.js";


const router = express.Router();


router.post("/", protectRoute, applyCoupon);
//late add add coupon route for admin


export default router;