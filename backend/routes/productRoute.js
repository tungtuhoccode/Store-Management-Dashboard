import express from "express"
import { getAllProducts, getProduct, getDisplayedProduct, createNewProduct, deleteProduct, getCategoryProducts, toggleDisplayedProduct } from "../controllers/productController.js"
import { protectRoute, adminRoute } from "../middleware/authMiddleware.js"

const router = express.Router();


router.get("/", protectRoute, adminRoute, getAllProducts);
router.get("/displayedProduct", getDisplayedProduct);
router.patch("/:id", protectRoute, adminRoute, toggleDisplayedProduct);
router.post("/", protectRoute, adminRoute, createNewProduct);
router.delete("/:id", protectRoute, adminRoute, deleteProduct);
router.get("/category/:category", getCategoryProducts);
router.get("/:id", getProduct);

// need to add slide Product and toggle slide product



export default router;