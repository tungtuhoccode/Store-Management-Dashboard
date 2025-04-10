import express from "express";

import { getCartProduct, addToCart, deleteCartProduct, updateQuantity } from "../controllers/cartController.js";
import { protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protectRoute, getCartProduct);
router.post("/", protectRoute, addToCart);
router.delete("/", protectRoute, deleteCartProduct);
router.put("/:id", protectRoute, updateQuantity);
export default router;

