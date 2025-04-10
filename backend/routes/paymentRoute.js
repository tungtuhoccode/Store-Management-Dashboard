import express from "express"
import { protectRoute } from "../middleware/authMiddleware.js";
import { createCheckoutSession, checkoutSuccessfull } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/create-checkout-session", protectRoute, createCheckoutSession);
router.post("/checkout-success", protectRoute, checkoutSuccessfull);

export default router; 